import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Domain = createParamDecorator(
  (input: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const domain = req.headers['host'];
    const str: string = 'R fsadfasdf R';
    str.replace(/R/g, 'yyyyyyyy');
    console.log(req);
    return domain ? domain : input;
  },
);
