import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth-guard.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard';
import { SessionLoginAuthGuard } from 'src/auth/guards/session-login-auth.guard';
import { Roles, RolesEnum } from 'src/common/decorators/role.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login') //login
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  login(@Request() req) {
    return this.authService.createToken(req.user);
  }

  @Get() //protected
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  getAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', type: 'number' })
  updateRole(@Param('id', ParseIntPipe) id, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }
}
