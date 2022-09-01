import { OmitType } from "@nestjs/mapped-types";
import { UserEntity } from "../entities/user.entity";

export class CreateUserDto extends OmitType(UserEntity, ['id', 'ip', 'posts']) {}
