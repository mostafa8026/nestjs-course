import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { RequestMonitorService } from 'src/request-monitor/request-monitor.service';

@Injectable()
export class RequestMonitorMiddleware implements NestMiddleware {

  constructor(
    private readonly _requestMonitorService: RequestMonitorService,
  ){}

  async use(req: any, res: Response, next: () => void) {
    const start: Date = new Date();
    const reqMonitor = await this._requestMonitorService.create(req, res, 0);

    res.on('finish', () => {
      const end = new Date();
      const duration = +end - +start; // millisecond
      this._requestMonitorService.create(req, res, duration, reqMonitor.id);

    })
    next();
  }
}
