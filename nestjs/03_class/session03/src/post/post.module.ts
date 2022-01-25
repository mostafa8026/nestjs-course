import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/event/entities/event.entity';
import { CategoryEntity } from './entities/category.entity';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CategoryEntity, EventEntity])],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'MAIL_API',
      useValue: 'http://mail.google.com',
    },
  ],
})
export class PostModule {}
