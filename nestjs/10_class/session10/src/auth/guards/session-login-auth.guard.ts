import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LocalAuthGuard } from './local-auth-guard.guard';

@Injectable()
export class SessionLoginAuthGuard extends LocalAuthGuard {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest<Request>();

    await super.logIn(request);
    return result;
  }
}
