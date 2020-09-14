import { Provider } from '@nestjs/common';
import { createConnection } from 'typeorm';

import { ConfigService } from './../config/config.service';

export const DATABASE_CONNECTION_TOKEN = 'DATABASE_CONNECTION';

export const databaseProviders: Provider[] = [
    {
        provide: DATABASE_CONNECTION_TOKEN,
        inject: [ConfigService],
        useFactory: async (cfg: ConfigService) => {
            const connection = await createConnection({
                type: 'mysql',
                host: cfg.mysqlHost,
                port: cfg.mysqlPort,
                username: cfg.mysqlUsername,
                password: cfg.mysqlPassword,
                database: cfg.mysqlDatabase,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            })
            return await connection.synchronize();
        }
            
    },
];
