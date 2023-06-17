import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogErrorFilter } from 'src/global-binded/filters/log-error.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { ErrorsModule } from './errors/errors.module';
import { EventModule } from './event/event.module';
import { GlobalBindedModule } from './global-binded/global-binded.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { TranslationModule } from './translation/translation.module';
import { UserModule } from './user/user.module';
import { ApiKeyModule } from './api-key/api-key.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'translation',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
