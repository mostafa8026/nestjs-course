import { Injectable } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  private posts: PostEntity[] = [
    {
      id: 1,
      title: 'Car 01',
      content: 'This car is so precious',
      location: 'Mashad',
      categories: ['car', 'mashad'],
    },
  ];

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((item) => item.id === id);
  }

  create(body: any) {
    this.posts.push(body);
  }

  update(id: number, body: any) {
    const existingPost = this.findOne(id);
    if (existingPost) {
      existingPost.title = body.title;
      existingPost.content = body.content;
      existingPost.location = body.location;
      existingPost.categories = body.categories;
    }
  }

  remove(id: number) {
    const existingPost = this.posts.findIndex((item) => item.id === id);
    if (existingPost >= 0) {
      this.posts.splice(existingPost, 1);
    }
  }
}
