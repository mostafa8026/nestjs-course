import { OmitType, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { RoleEnum } from 'src/enums/roles.enum';
import { RoleEntity } from 'src/role/entities/role.entity';
import { UserEntity } from '../entities/user.entity';
export class CreateUserDto extends PickType(UserEntity, [
  'username',
  'password',
  'name',
] as const) {
  @IsString({ each: true })
  roles: string[];
}
