import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {PostService} from "./post.service";

@Controller('/post')
export class PostController {
    constructor(private postService: PostService) {
    }

    // ?page=1&count=10
    @Get('')
    getPosts(@Query('page') page, @Query('count') count) {
        return this.postService.get(page, count);
    }

    @Post('')
    insertPost(@Body() body: Record<string, any>) {
        return `post inserted with the body: ${JSON.stringify(body)}`;
    }

    @Put('/:id')
    update(@Param('id') id: string) {
        return `post updated with this id: ${id}`;
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return `post deleted with this id: ${id}`
    }
}