import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ReqResDurationMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    console.log('Middleware called');
    let startDate = new Date();
    res.on('finish', () => {
      let endDate = new Date();
      let duration = +endDate - +startDate;

      console.log('Request response duration: ', duration);
    });
    next();
  }
}
