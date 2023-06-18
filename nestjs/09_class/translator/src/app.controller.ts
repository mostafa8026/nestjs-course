import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Record<string, any> {
    return {
      name: 'ali'
    }
  }

  @Post()
  postSomething(@Body() body, @Headers() headers) {
    return {
      body,
      headers
    }
  }
}
