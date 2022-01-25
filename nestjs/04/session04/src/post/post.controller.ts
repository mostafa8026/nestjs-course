import { Fields } from './../translate/translate.service';
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
import { EventTypes } from 'src/event/entities/event.entity';
import { TranslateService } from 'src/translate/translate.service';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly translate: TranslateService,
  ) {}

  @Get()
  findAll() {
    console.log(this.translate.translate(Fields.BannerText));
    return this.postService.findAll();
  }

  @Get('/paginate')
  findAllPaginated(@Query() query: PaginationDto) {
    return this.postService.findAll(query);
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
    console.log(body instanceof UpdatePostDto);
    return this.postService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.postService.delete(+id);
  }

  @Patch('/event/:type/:id')
  like(@Param('id') id, @Param('type') type: EventTypes) {
    console.log('event');
    console.log(id);
    return this.postService.event(+id, type);
  }
}
