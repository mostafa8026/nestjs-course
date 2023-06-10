import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsObject } from "class-validator";

export class PaginationQuery {
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    page: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    limit: number;
}

export class PaginationResult<T> {
    @IsObject({
        each: true
    })
    items: T[];

    @IsNumber()
    total: number;
}