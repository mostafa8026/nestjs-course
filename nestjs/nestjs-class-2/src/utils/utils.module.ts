import { DynamicModule, Module, Scope } from '@nestjs/common';
import { IPController } from './ip.controller';
import { IPService } from './ip.service';
import { UTIL_MODULE_CONFIG_OPTIONS } from './tokens.constant';
import got from 'got';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { UtilModuleConfigAsyncOptions, UtilModuleConfigOptions } from './ip-async-options.interface';
import { ConfigModule } from '@nestjs/config';
import { userConfig } from 'src/user/config/user.config';
import { PostModule } from 'src/post/post.module';

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
    static register(config: UtilModuleConfigOptions): DynamicModule {
        return {
            module: UtilsModule,
            controllers: [IPController],
            providers: [
                IPService,
                {
                    provide: UTIL_MODULE_CONFIG_OPTIONS,
                    useValue: config.ipUrl
                }
            ],
            exports: [IPService]
        }
    }

    static registerAsync(ipConfigOptions: UtilModuleConfigAsyncOptions): DynamicModule {
        console.log(ipConfigOptions.imports)
        return {
            module: UtilsModule,
            controllers: [IPController],
            imports: ipConfigOptions.imports || [],
            providers: [
                IPService,
                {
                    provide: UTIL_MODULE_CONFIG_OPTIONS,
                    inject: ipConfigOptions.inject || [],
                    useFactory: ipConfigOptions.useFactory
                }
            ],
            exports: [IPService]
        }
    }
}
