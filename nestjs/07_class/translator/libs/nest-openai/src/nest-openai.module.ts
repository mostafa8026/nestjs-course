import {
  DynamicModule,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
} from '@nestjs/common';
import { OPENAI_APIKEY } from './constants/injection-tokens';
import { NestOpenaiRequestScopeService } from './nest-openai-request-scope.service';
import { NestOpenaiService } from './nest-openai.service';

@Module({})
export class NestOpenaiModule {
  static register(apiKey: string): DynamicModule {
    console.log('apikey', apiKey);
    return {
      module: NestOpenaiModule,
      providers: [
        {
          provide: OPENAI_APIKEY,
          useValue: apiKey,
        },
        NestOpenaiService,
        NestOpenaiRequestScopeService,
      ],
      exports: [NestOpenaiService, NestOpenaiRequestScopeService],
    };
  }

  static registerAsync(options: {
    imports: any[],
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useFactory: (...args: any[]) => string | Promise<string>;
  }): DynamicModule {
    return {
      module: NestOpenaiModule,
      imports: options.imports,
      providers: [
        {
          provide: OPENAI_APIKEY,
          inject: options.inject,
          useFactory: options.useFactory,
        },
        NestOpenaiService,
        NestOpenaiRequestScopeService,
      ],
      exports: [NestOpenaiService, NestOpenaiRequestScopeService],
    };
  }
}
