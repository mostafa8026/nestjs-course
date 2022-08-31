import { Controller, Get } from "@nestjs/common";
import { PostService } from "./post.service";

@Controller('/other')
export class OtherController {
    constructor(private postService: PostService){
        console.log('Other controller initializing...')
    }

    @Get()
    get(){
        return 'asdf'
    }
}