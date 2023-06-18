import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { PRIVATE_METADATA } from 'src/shared/constants/metadata.constant';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly _apiKeyService: ApiKeyService,
    private readonly _reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    /** apikey exists */
    const request = context.switchToHttp().getRequest<Request>();
    const privateRoute = this._reflector.get(
      PRIVATE_METADATA,
      context.getHandler(),
    ) as boolean;
    if (!privateRoute) return true;

    const apiKeyHeader = request.headers['x-api-key'] as string;
    const apiKey = await this._apiKeyService.getByApiKey(apiKeyHeader);
    console.log(apiKey);
    if (apiKey) {
      return true;
    }

    return false;
  }
}
