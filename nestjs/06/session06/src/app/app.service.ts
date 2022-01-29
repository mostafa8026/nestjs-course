import { APP_PIPE } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly app: ConfigType<typeof appConfig>,
    @Inject(APP_PIPE)
    private readonly aaaa: any,
  ) {
    console.log(this.aaaa);
    console.log('database host', app.database.host);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
