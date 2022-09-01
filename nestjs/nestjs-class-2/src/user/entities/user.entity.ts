import { IsArray, IsNumber, IsString } from "class-validator";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, IsNull, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    ip: string;

    @ManyToMany(()=>PostEntity, p=>p.users)
    @JoinTable({
        name: 'UserPosts'
    })
    @IsArray()
    posts: PostEntity[];
}
