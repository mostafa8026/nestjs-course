import { Body, Controller, Get, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  @Get()
  getUsers() {
    return [];
  }

  @Get(':id')
  getUser(@Param('id') id) {
    return id;
  }

  @Patch('username/:id')
  updateUserName(
    @Body('username') username,
    @Res({passthrough: true}) response: Response
  ) {
    response.status(204);
    console.log('Username updated');
  }
}
