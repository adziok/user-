import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [
        UserService,
    ],
})
export class UserModule {}
