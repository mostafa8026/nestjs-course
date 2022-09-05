import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { appConfig } from './app.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(appConfig.KEY) 
    private readonly appConfigService: ConfigType<typeof appConfig>
    ) {
    console.log('**** PORT is: ', appConfigService.port);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
