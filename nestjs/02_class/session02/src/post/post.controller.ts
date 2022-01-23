import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Param,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('/paginate')
  findAllPaginated(@Query() query) {
    return `All post, paginated, page: ${query.page}, count: ${query.count}`;
  }

  @Get('/:id')
  findOne(@Param('id') id) {
    return this.postService.findOne(parseInt(id));
  }

  @Post('/')
  insert(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Put(':id')
  update(@Param('id') id, @Body() body: UpdatePostDto) {
    return this.postService.update(+id, body);
  }

  @Patch(':id')
  patch(@Param('id') id, @Body() body: UpdatePostDto) {
    console.log(body instanceof UpdatePostDto)
    return this.postService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.postService.delete(+id);
  }
}
