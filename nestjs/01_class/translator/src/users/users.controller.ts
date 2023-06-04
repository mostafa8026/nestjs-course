import { Controller, Get, Param } from '@nestjs/common';

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
}
