import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        HOST: Joi.string().required(),
        PORT: Joi.number().required(),
        USER_NAME: Joi.string().default('user1'),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
