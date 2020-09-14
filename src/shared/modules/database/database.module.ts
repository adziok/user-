import { ConfigService } from './../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';

import { Connection } from 'typeorm';

@Global()
@Module({
    imports: [TypeOrmModule.forRootAsync({
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
        inject: [ConfigService]
    })],
    // providers: [...databaseProviders],
    // exports: [...databaseProviders],
})
export class DatabaseModule {
    constructor(private connection: Connection) {
    }
}
