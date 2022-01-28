import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  getCurrencySign(currency: string, full: boolean) {
    let sign = '';
    switch (currency) {
      case 'euro':
        sign = '€';
        break;
      case 'dollar':
        sign = '$';
        break;
      case 'rial':
        sign = '﷼';
        break;
      default:
        sign = 'X';
        break;
    }

    return full ? `${sign} ${currency}` : sign;
  }
}
