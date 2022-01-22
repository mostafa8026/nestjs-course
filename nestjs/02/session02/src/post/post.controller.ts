import { PostService } from './post.service';
import { Controller, Get } from '@nestjs/common';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll() {
      return this.postService.findAll();
  }
}
