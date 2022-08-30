import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {
        console.log('Post controller initializing...');
    }

    @Post()
    async insert(@Body() body: CreatePostDto): Promise<PostEntity> {
        console.log(body instanceof CreatePostDto)
        //console.log(body);
        body.printMe();
        return this.postService.insert(body);
    }

    @Patch()
    updatePatch(@Body() body: UpdatePostDto) {
        return this.postService.update(body);
    }
}
