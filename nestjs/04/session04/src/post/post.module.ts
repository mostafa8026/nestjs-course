import { TranslateService } from './../translate/translate.service';
import { CurrencyModule } from './../currency/currency.module';
import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/event/entities/event.entity';
import { CategoryEntity } from './entities/category.entity';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { config } from 'process';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CategoryEntity, EventEntity]),
    ConfigModule,
    CurrencyModule.forRoot(true),
  ],
  controllers: [PostController],
  providers: [
    TranslateService,
    PostService,
    {
      provide: 'MAIL_API',
      useValue: 'http://mail.google.com',
    },
  ],
})
export class PostModule {}
