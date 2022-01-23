import { CategoryEntity } from './../category/entities/category.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    console.log(`PostService: constructor`);
  }

  findAll() {
    return this.postRepository.find({
      relations: ['categories', 'user'],
    });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne(id, {
      relations: ['categories', 'user'],
    });
    if (!post) {
      throw new NotFoundException(`Post with id of ${id} not found`);
    }
    return post;
  }

  async create(body: CreatePostDto) {
    const categories = await Promise.all(
      body.categories.map((x) => {
        return this.preloadCategory(x);
      }),
    );
    console.log(categories);
    const post = this.postRepository.create({
      ...body,
      categories,
    });

    return this.postRepository.save(post);
  }

  async preloadCategory(x) {
    const category = await this.categoryRepository.findOne({ name: x });
    if (category) {
      console.log(category);
      return category;
    } else return this.categoryRepository.create({ name: x });
  }

  async update(id: number, body: UpdatePostDto) {
    // const post = await this.findOne(id);
    // if (post) {
    //   if (body.title) {
    //     post.title = body.title;
    //   }
    //   if (body.content) {
    //     post.content = body.content;
    //   }
    //   if (body.location) {
    //     post.location = body.location;
    //   }
    //   if (body.categories) {
    //     post.categories = body.categories;
    //   }
    // } else {
    //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    // }

    const categories =
      body.categories &&
      (await Promise.all(
        body.categories.map((x) => {
          return this.preloadCategory(x);
        }),
      ));

    const post = await this.postRepository.preload({
      id: id,
      ...body,
      categories,
    });
    if (!post) {
      throw new NotFoundException(`Post with id of ${id} not found`);
    }

    return this.postRepository.save(post);
  }

  async delete(id: number) {
    const post = await this.findOne(id);
    return this.postRepository.remove(post);
  }
}
