import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({ imports: [TypeOrmModule.forFeature([CategoryEntity])] })
export class CategoryModule {}
