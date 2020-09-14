import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

import { RedisSubscribeService } from './redis-subscribe.service';
import { ConfigService } from './../config/config.service';

export type RedisClient = Redis.Redis;

export const REDIS_CLIENT_TOKEN = 'REDIS_CLIENT';

@Global()
@Module({
    providers: [
        {
            useFactory: async (cfg: ConfigService): Promise<RedisClient> => {
                return new Redis({
                    host: cfg.redisHost,
                    port: cfg.redisPort,
                });
            },
            inject: [ConfigService],
            provide: REDIS_CLIENT_TOKEN,
        },
        RedisSubscribeService,
    ],
    exports: [RedisSubscribeService],
})
export class RedisModule {}
