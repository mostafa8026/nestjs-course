import { OmitType } from '@nestjs/mapped-types';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { PostEntity } from '../entities/post.entity';

export class CreatePostDto extends OmitType(PostEntity, ['id']) {

    constructor(object) {
        super();
        Object.assign(this, object);
    }

    printMe() {
        console.log(this);
    }
}
