import { Module, Provider } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { MyLoggerModule } from '../my-logger/my-logger.module';
import { OPENAI_APIKEY } from './constants/injection-tokens';
import { NestOpenaiService } from './nest-openai.service';

const apikeyProvider: Provider = {
  provide: OPENAI_APIKEY,
  inject: [ConfigurationService],
  useFactory: (configService: ConfigurationService) => {
    return configService.get(OPENAI_APIKEY);
  },
};
@Module({
  imports: [MyLoggerModule, ConfigurationModule],
  providers: [NestOpenaiService, apikeyProvider],
  exports: [NestOpenaiService],
})
export class NestOpenaiModule {}
