import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import appConfig from './config/app.config';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';
import { UtilityModule } from 'src/utility/utility.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { LoggerModule } from 'src/logger/logger.module';
import { TranslateModule } from 'src/translate/translate.module';
import { TextfieldsModule } from 'src/textfields/textfields.module';
import postConfig from 'src/post/config/post.config';
import { UserService } from 'src/user/user.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LogExceptionFilter } from 'src/common/filters/log-exception.filter';
import { AppKeyGuard } from 'src/common/guards/app-key.guard';
import { AppKeyModule } from 'src/app-key/app-key.module';
import { TimeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';
import { NotifyModule } from 'src/notify/notify.module';
import { ReqResDurationMiddleware } from 'src/common/middlewares/req-res-duration.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        HOST: Joi.string().required(),
        PORT: Joi.number().required(),
        USER_NAME: Joi.string().default('user1'),
        VALIDATION_WHITE_LIST: Joi.boolean(),
        FORBIDDEN_NON_WHITE_LISTED: Joi.boolean(),
        TIMEOUT: Joi.number(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      useFactory: (app: ConfigType<typeof appConfig>) => {
        return {
          type: 'mssql',
          ...app.database,
          extra: {
            trustServerCertificate: true,
          },
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [appConfig.KEY],
    }),
    UserModule,
    EventModule,
    UtilityModule,
    CurrencyModule,
    LoggerModule,
    TranslateModule,
    TextfieldsModule,
    PostModule,
    AppKeyModule,
    NotifyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: LogExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AppKeyGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    // {
    //   provide: APP_PIPE,
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     console.log(
    //       'ValidationPipe',
    //       typeof configService.get<Boolean>('VALIDATION_WHITE_LIST'),
    //     );
    //     return new ValidationPipe({
    //       whitelist: configService.get<boolean>('VALIDATION_WHITE_LIST'),
    //       forbidNonWhitelisted: configService.get<boolean>(
    //         'FORBIDDEN_NON_WHITE_LISTED',
    //       ),
    //     });
    //   },
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReqResDurationMiddleware).forRoutes({
      method: RequestMethod.POST,
      path: '*',
    });
  }
}
