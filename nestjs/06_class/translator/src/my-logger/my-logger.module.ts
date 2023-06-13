import { Module } from '@nestjs/common';
import got from 'got';
import { IP } from './constants/injection-tokens';
import { MyLoggerService } from './my-logger.service';

@Module({
  providers: [
    MyLoggerService,
    {
      provide: IP,
      useFactory: async () => {
        const response = await got.get('https://ip-api.ir/info/myip');
        const body = response.body;
        console.log('body', body);
        const myip = JSON.parse(body);

        await new Promise((resolve) => {
          setTimeout(() => resolve(1), 5000)
        })
        return myip.MyIP;
      },
    },
  ],
  exports: [MyLoggerService],
})
export class MyLoggerModule {}
