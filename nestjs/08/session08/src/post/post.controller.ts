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
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CustomParam } from 'src/common/decorators/custom-param.decorator';
import { AppKeyGuard } from 'src/common/guards/app-key.guard';
import { isPublic } from 'src/common/guards/is-public.decorator';
import { EventTypes } from 'src/event/entities/event.entity';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @isPublic()
  findAll(@CustomParam() param) {
    console.log(param);
    return this.postService.findAll();
  }

  @Get('/paginate')
  findAllPaginated(@Query() query: PaginationDto) {
    return this.postService.findAll(query);
  }

  @Get('/:id')
  @isPublic()
  async findOne(@Param('id') id) {
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(null);
    //   }, 5000);
    // });
    return this.postService.findOne(parseInt(id));
  }

  @Post('/')
  insert(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePostDto) {
    return this.postService.update(id, body);
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

  @Patch(':id/event/:type/:userId')
  like(
    @Param('id') id,
    @Param('userId') userId,
    @Param('type') type: EventTypes,
  ) {
    console.log('event');
    console.log(id);
    return this.postService.event(+id, type, userId);
  }
}
