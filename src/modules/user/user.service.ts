import { NewUserDto } from './dto/new-user.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { GetUsersQuery } from './query/get-users.query';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    public getUsers({ limit: take, skip }: GetUsersQuery) {
        return this.userRepository.find({ take, skip });
    }

    public createUser(newUserDto: NewUserDto) {
        console.log(newUserDto);
        return this.userRepository.insert(newUserDto)
            .then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
    }
}
