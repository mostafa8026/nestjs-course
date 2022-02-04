import { SetMetadata } from '@nestjs/common';
import { RoleEntity } from 'src/role/entities/role.entity';

export const ROLES_CONSTANT = 'roles';
export const enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const Roles = (...roles: RolesEnum[]) => {
  return SetMetadata(ROLES_CONSTANT, roles);
};
