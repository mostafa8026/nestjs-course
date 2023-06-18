import { ValidationPipe } from "@nestjs/common";

export class MyValidationPipe extends ValidationPipe{
  constructor(){
    super({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  }
}