import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetUsersQuery {
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(100)
    limit = 10;

    @IsNumber()
    @IsOptional()
    skip = 0;
}
