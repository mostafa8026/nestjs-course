import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  /**
   * curl -X GET http://localhost:3000/users
   * @returns 
   */
  @Get('')
  sayHi(@Req() req: Request): string {
    console.log(req.headers);
    console.log(req.body);
    return 'Hi there!';
  }

  @Post('')
  sayHiPost(@Req() req: Request, @Body() body): string {
    console.log(req.headers);
    console.log(req.body);
    console.log(body);
    return 'Hi there PSOT!';
  }
}
