import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import appConfig from './configs/app.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly rootConfig: ConfigType<typeof appConfig>,
  ) {
    console.log(`port: ${this.rootConfig.database.port}`);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
