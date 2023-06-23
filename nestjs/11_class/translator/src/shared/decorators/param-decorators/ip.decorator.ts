import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export function Ip() {
  return createParamDecorator((data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    return req.ip;
  });
}
