import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { RequestMonitorModule } from './request-monitor/request-monitor.module';
import datasource from './shared/db/typeorm-datasource';
import { TranslationModule } from './translation/translation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSercie: ConfigService) => {
        const synchronize = configSercie.get('NODE_ENV') === 'development';
        const { entities, migrations, ...options } = datasource.options;
        return {
          ...options,
          autoLoadEntities: true,
          synchronize,
        };
      },
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
