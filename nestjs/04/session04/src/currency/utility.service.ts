import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  constructor(@Inject('FULL') private readonly fullCharacter: boolean) {}
  getCurrencyCharacter(currency: string) {
    if (currency == 'euro') {
      return this.fullCharacter ? 'EURO €' : '€';
    }
  }
}
