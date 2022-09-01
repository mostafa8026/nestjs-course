import { DynamicModule, Module, Scope } from '@nestjs/common';
import { IPController } from './ip.controller';
import { IPService } from './ip.service';
import { IP_URL } from './tokens.constant';
import got from 'got';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { ConfigurationService } from 'src/configuration/configuration.service';

// @Module({
//     imports: [ConfigurationModule],
//     controllers: [IPController],
//     providers: [
//         IPService,
//         {
//             provide: IP_URL,
//             useFactory: async (configurationService: ConfigurationService)=>{
//                 const config =  await configurationService.findOne('ip-url');
//                 return config.value;
//             },
//             inject: [ConfigurationService],
//         }
//     ],
//     exports: [IPService]
// })
export class UtilsModule {
    static register(url: string): DynamicModule {
        return {
            module: UtilsModule,
            controllers: [IPController],
            providers: [
                IPService,
                {
                    provide: IP_URL,
                    useValue: url
                }
            ],
            exports: [IPService]
        }
    }
}
