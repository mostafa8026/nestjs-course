import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
    insert(post: CreatePostDto): PostEntity {
        // insert
        const postEntity = new PostEntity();
        postEntity.id = post.id;
        postEntity.name = post.name;

        return postEntity;
    }

    update(body: UpdatePostDto) {
        const postEntity = new PostEntity();
        postEntity.name = body.name;

        return postEntity;
    }
}
