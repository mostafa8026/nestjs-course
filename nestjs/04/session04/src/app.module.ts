import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { UserController } from './user/user.controller';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { CurrencyModule } from './currency/currency.module';
import { TranslateService } from './translate/translate.service';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'user',
      password: '',
      extra: {
        trustServerCertificate: true,
      },
      database: 'typeorm',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule,
    CurrencyModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, TranslateService],
})
export class AppModule {}
