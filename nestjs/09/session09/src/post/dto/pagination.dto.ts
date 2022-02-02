import { Type } from 'class-transformer';
import { IsNegative, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  page: number;

  @IsOptional()
  pageCount: number;
}
