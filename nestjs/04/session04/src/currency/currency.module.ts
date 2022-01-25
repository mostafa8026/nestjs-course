import { ConfigModule } from './../config/config.module';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { UtilityService } from './utility.service';

@Module({})
export class CurrencyModule {
  static forRoot(fullCharacter: boolean): DynamicModule {
    return {
      module: CurrencyModule,
      imports: [ConfigModule],
      providers: [
        UtilityService,
        {
          provide: 'CURRENCY',
          useFactory: async (
            utilityService: UtilityService,
            configService: ConfigService,
          ) => {
            const currency = await configService.getCurrency();
            console.log(currency);
            return utilityService.getCurrencyCharacter(currency.value);
          },
          inject: [UtilityService, ConfigService],
        },
        {
          provide: 'FULL',
          useValue: fullCharacter,
        },
      ],
      exports: ['CURRENCY'],
    };
  }
}
