import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ReqDurationMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    let start = new Date();
    console.log('Middleware called');
    console.time('Req-Res duration');

    res.on('', () => {
      let end = new Date();
      var diff = +end - +start;
      console.log('duration: ', diff, ' ms');
    });
    next();
  }
}
