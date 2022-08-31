import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { PostEntity } from './entities/post.entity';
import { OtherController } from './other.controller';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController, OtherController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
