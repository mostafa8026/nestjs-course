import { EventService } from './../event/event.service';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly eventService: EventService,
  ) {
    this.loggerService.setPrefix('UserService');
    this.loggerService.log('Constructor called');
  }

  findAll() {
    this.loggerService.log('findAll');
    return 'user find all';
  }
}
