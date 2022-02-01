import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AppKeyService } from 'src/app-key/app-key.service';
import { IS_PUBLIC } from './is-public.decorator';

@Injectable()
export class AppKeyGuard implements CanActivate {
  constructor(
    private readonly appKeyService: AppKeyService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC, context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    let appKey;
    if (request.headers['x-app-key']) {
      appKey = request.headers['x-app-key'];
    } else {
      throw new BadRequestException(`Header must have x-app-key`);
    }

    const entity = await this.appKeyService.findOne(appKey);
    if (!entity) {
      return false;
    }

    return true;
  }
}
