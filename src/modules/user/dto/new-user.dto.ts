import { IsString, Length } from 'class-validator';

export class NewUserDto {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsString()
    @Length(1, 255)
    surename: string;

    @IsString()
    @Length(1, 255)
    address: string;
}
