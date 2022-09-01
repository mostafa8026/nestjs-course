import { Injectable, Scope } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostService {

    constructor(private postRepository: PostRepository){
        console.log('Post service Initializing ...');
    }

    async findByName(name: string) {
        return this.postRepository.findByName(name);
    }

    async insert(post: CreatePostDto): Promise<PostEntity> {
        const postEntity = new PostEntity();
        postEntity.name = post.name;
        const dbPostEntity = await this.postRepository.save(postEntity);

        return dbPostEntity;
    }

    update(body: UpdatePostDto) {
        const postEntity = new PostEntity();
        postEntity.name = body.name;

        return postEntity;
    }
}
