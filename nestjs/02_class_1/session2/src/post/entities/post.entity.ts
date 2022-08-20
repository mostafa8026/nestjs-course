import { IsNumber, IsString, MaxLength } from 'class-validator';

export class PostEntity {
    @IsNumber()
    id: number;

    @IsString()
    @MaxLength(10)
    name: string;
}
