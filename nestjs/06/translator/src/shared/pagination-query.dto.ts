import { Transform } from 'class-transformer';
import { IsNumber, IsObject, Min } from 'class-validator';

export class PaginationQuery {
  @IsNumber()
  @Min(1)
  @Transform((input) => parseInt(input.value))
  page: number;

  @IsNumber()
  @Min(1)
  @Transform((input) => parseInt(input.value))
  limit: number;
}

export class PaginationResult<T> {
  @IsObject({
    each: true,
  })
  items: T[];

  @IsNumber()
  total: number;
}
