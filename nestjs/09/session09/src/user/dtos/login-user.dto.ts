import { UserEntity } from 'src/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class LoginUserDto extends PickType(UserEntity, [
  'username',
  'password',
] as const) {}
