import { Body, Controller, Get, Headers, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
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
