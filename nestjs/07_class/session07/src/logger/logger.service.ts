import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService {
  private prefix: string;

  log(input: string) {
    console.log(`[${this.prefix}] `, input);
  }

  setPrefix(_prefix: string) {
    this.prefix = _prefix;
  }
}
