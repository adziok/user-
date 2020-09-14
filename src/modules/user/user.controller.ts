import { RedisSubscribeService } from './../../shared/modules/redis/redis-subscribe.service';
import { Controller, Get, Query } from '@nestjs/common';

import { GetUsersQuery } from './query/get-users.query';
import { UserService } from './user.service';
import { NewUserDto } from './dto/new-user.dto';

@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly redisSubscribeService: RedisSubscribeService,
    ) {
        this.createUser()
    }

    @Get()
    public getUsers(@Query() q: GetUsersQuery) {
        return this.userService.getUsers(q);
    }

    public createUser() {
        this.redisSubscribeService.fromEvent('create-user')
            .subscribe((newUserDto: NewUserDto) => this.userService.createUser(newUserDto))
    }
}
