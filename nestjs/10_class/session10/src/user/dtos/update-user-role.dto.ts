import { PickType } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserRoleDto extends PickType(CreateUserDto, [
  'roles',
] as const) {}
