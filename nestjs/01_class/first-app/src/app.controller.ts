import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('/')
  helloWorld() {
    return 'Hello World';
  }
}
