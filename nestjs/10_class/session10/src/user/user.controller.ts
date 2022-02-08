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
import { number } from 'joi';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth-guard.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard';
import { SessionLoginAuthGuard } from 'src/auth/guards/session-login-auth.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/enums/roles.enum';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserRoleDto } from './dtos/update-user-role.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@Role(RoleEnum.ADMIN)
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
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  getAll(@Request() req) {
    console.log('---------------> asdfasdf');
    console.log(req.user);
    return this.userService.findAll();
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  updateRole(@Param('id', ParseIntPipe) id, @Body() data: UpdateUserRoleDto) {
    return this.userService.updateRole(id, data);
  }
}
