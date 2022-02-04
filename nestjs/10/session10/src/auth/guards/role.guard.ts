import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  RolesEnum,
  ROLES_CONSTANT,
} from 'src/common/decorators/role.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflectService: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflectService.getAllAndOverride<string[]>(
      ROLES_CONSTANT,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // everything is fine, just calm down
    }

    const user = context.switchToHttp().getRequest<Request>()
      .user as UserEntity;

    console.log(user);

    const access = user.roles.some((role) => requiredRoles.includes(role.name));

    return access;
  }
}
