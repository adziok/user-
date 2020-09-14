import { Module } from '@nestjs/common';

import { RedisModule } from './../shared/modules/redis/redis.module';
import { DatabaseModule } from './../shared/modules/database/database.module';
import { ConfigModule } from './../shared/modules/config/config.module';
import { UserModule } from '../modules/user/user.module';

@Module({
    imports: [ConfigModule, RedisModule, DatabaseModule, UserModule],
})
export class CoreModule {}
