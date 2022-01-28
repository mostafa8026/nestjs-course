import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.setPrefix('UserService');
    this.loggerService.log('Constructor called');
  }

  findAll() {
    this.loggerService.log('findAll');
    return 'user find all';
  }
}
