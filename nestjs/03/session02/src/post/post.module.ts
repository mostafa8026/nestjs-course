import { CategoryEntity } from './../category/entities/category.entity';
import { CategoryModule } from './../category/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CategoryEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
