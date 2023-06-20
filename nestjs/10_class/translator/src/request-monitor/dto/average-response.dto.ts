import { IsNumber } from 'class-validator';

export class AverageResponseTimeDto {
  @IsNumber()
  duration: number;
}
