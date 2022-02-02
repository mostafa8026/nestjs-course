import { OmitType } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
export class CreateUserDto extends OmitType(UserEntity, ['id', 'posts', 'events'] as const) {}
