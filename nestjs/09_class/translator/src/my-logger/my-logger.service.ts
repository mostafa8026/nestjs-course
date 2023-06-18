import { Inject, Injectable, Scope } from '@nestjs/common';
import { IP } from './constants/injection-tokens';

@Injectable({
  scope: Scope.TRANSIENT
})
export class MyLoggerService {
  context: string = 'MyLoggerService';
  constructor(
    @Inject(IP)
    private ip: string,
  ) {
    console.log('logger service instantiated')
  }

  async log(message: string) {
    console.log(`[${this.context}] - [${this.ip}] - ${message}`);
  }

  setContext(context: string) {
    this.context = context;
  }
}
