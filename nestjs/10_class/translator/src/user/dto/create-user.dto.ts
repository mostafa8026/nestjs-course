import { PickType } from "@nestjs/mapped-types";
import { UserEntity } from "src/user/entities/user.entity";

export class CreateUserDto extends PickType(UserEntity, ['name'] as const) {}
