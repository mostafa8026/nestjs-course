import { DynamicModule, Module } from '@nestjs/common';
import { CURRENCY_SIGN } from './constants/token.constant';
import { CurrencyService } from './currency.service';

@Module({})
export class CurrencyModule {
  static forRoot(full: boolean): DynamicModule {
    return {
      module: CurrencyModule,
      imports: [],
      providers: [
        CurrencyService,
        {
          provide: CURRENCY_SIGN,
          useFactory: async (currencyService: CurrencyService) => {
            return currencyService.getCurrencySign(process.env.CURRENCY, full);
          },
          inject: [CurrencyService],
        },
      ],
      exports: [CURRENCY_SIGN],
    };
  }
}
