import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyModule } from './api-key/api-key.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { ErrorsModule } from './errors/errors.module';
import { EventModule } from './event/event.module';
import { GlobalBindedModule } from './global-binded/global-binded.module';
import { LanguageModule } from './language/language.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { TranslationModule } from './translation/translation.module';
import { UserModule } from './user/user.module';
import { RequestMonitorModule } from './request-monitor/request-monitor.module';
import datasource from './shared/datasource'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...datasource.options,
      autoLoadEntities: true,
    }),
    UserModule,
    TranslationModule,
    EventModule,
    MyLoggerModule,
    ConfigurationModule,
    GlobalBindedModule,
    UserModule,
    ErrorsModule,
    ApiKeyModule,
    LanguageModule,
    RequestMonitorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
