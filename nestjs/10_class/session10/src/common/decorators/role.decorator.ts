import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/enums/roles.enum';

export const RoleConstant = 'role';

export const Role = (...roles: RoleEnum[]) => {
  console.log('role decorator ------->', roles);
  return SetMetadata(RoleConstant, roles);
};
