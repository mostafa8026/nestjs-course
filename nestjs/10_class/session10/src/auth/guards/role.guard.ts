import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RoleConstant } from 'src/common/decorators/role.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    console.log('===============> can activate role, ');
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserEntity;

    const requiredRole = this.reflector.getAllAndOverride(RoleConstant, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('required roles are, ', requiredRole);

    if (!requiredRole) {
      return true;
    }

    console.log(user);

    return user.roles.some((role) => requiredRole.includes(role.name));
  }
}
