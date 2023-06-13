import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { TranslationModule } from './translation/translation.module';
import { UsersModule } from './users/users.module';
import { NestOpenaiModule } from './nest-openai/nest-openai.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
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
    UsersModule,
    TranslationModule,
    EventModule,
    NestOpenaiModule,
    MyLoggerModule,
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
