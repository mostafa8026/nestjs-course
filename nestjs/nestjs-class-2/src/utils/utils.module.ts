import { Module, Scope } from '@nestjs/common';
import { IPController } from './ip.controller';
import { IPService } from './ip.service';
import { IP_URL } from './tokens.constant';
import got from 'got';

@Module({
    controllers: [IPController],
    providers: [
        IPService,
        {
            provide: IP_URL,
            useFactory: async () => {
                const url = await got.get('https://ifconfig.ovh');
                await new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(true);
                    }, 5000);
                  });
                return url.body.trim();
            }
        }
    ],
    exports: [IPService]
})
export class UtilsModule {}
