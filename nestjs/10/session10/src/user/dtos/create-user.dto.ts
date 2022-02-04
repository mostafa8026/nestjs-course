import { OmitType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
export class CreateUserDto extends PickType(UserEntity, [
  'username',
  'password',
  'name',
] as const) {
  roles: string[];
}
