import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';

import { ConfigService } from './../config/config.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (cfg: ConfigService) => ({
                type: 'mysql',
                host: cfg.mysqlHost,
                port: cfg.mysqlPort,
                username: cfg.mysqlUsername,
                password: cfg.mysqlPassword,
                database: cfg.mysqlDatabase,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
