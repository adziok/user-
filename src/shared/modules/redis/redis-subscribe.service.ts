import { Inject, Injectable } from '@nestjs/common';
import { Observable, Observer } from 'rxjs';
import { map, filter } from 'rxjs/operators'

import { RedisClient } from './redis.module';

@Injectable()
export class RedisSubscribeService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: RedisClient,
    ) {}

    public fromEvent<T>(eventName: string): Observable<T> {
        this.redisClient.subscribe(eventName);

        return new Observable((observer: Observer<any>) =>
            this.redisClient.on('message', (channel, message) => observer.next({ channel, message })),
        ).pipe(
            filter(({ channel }) => channel === eventName),
            map(({ message }) => JSON.parse(message)),
        );
    }
}
