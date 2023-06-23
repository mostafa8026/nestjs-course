import { IsNumber } from "class-validator";

export class CreateApiKeyDto {
  @IsNumber()
  userId: number
}