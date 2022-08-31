import { Injectable, Scope } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

    constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>){
        console.log('Post service Initializing ...');
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
