import { Inject, Injectable } from '@nestjs/common';
import { IP } from './constants/injection-tokens';

@Injectable()
export class MyLoggerService {
  constructor(
    @Inject(IP)
    private ip: string,
  ) {}

  async log(message: string) {

    console.log(`[${this.ip}] - ${message}`);
  }
}
