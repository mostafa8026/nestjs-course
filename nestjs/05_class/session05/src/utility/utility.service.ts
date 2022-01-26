import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  getCurrencySign(currency: string) {
    switch (currency) {
      case 'euro':
        return '€';
      case 'dollar':
        return '$';
      default:
        return '﷼';
    }
  }
}
