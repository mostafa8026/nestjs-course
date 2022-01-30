import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExceptionLogEntity } from '../entities/exception-log.entity';

@Injectable()
export class ExceptionLogService {
  constructor(
    @InjectRepository(ExceptionLogEntity)
    private readonly exceptionLogRepository: Repository<ExceptionLogEntity>,
  ) {}

  insertLog(statusCode: number, message: string) {
    const log = this.exceptionLogRepository.create({
      error: message,
      statusCode,
      createdAt: new Date(),
    });

    return this.exceptionLogRepository.save(log);
  }
}
