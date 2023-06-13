import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import datasource from './db/datasource';
import { EventModule } from './event/event.module';
import { TranslationModule } from './translation/translation.module';
import { UsersModule } from './users/users.module';

const {entities, ...options} = datasource.options;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...options,
      autoLoadEntities: true,
    }),
    UsersModule,
    TranslationModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
