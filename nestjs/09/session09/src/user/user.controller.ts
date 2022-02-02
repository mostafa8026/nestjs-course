import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBody({
    type: LoginUserDto,
  })
  login(@Request() req) {
    return req.user;
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
