import { IsNumber, IsString, MaxLength } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity('Post')
export class PostEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @MaxLength(10)
    @Column()
    name: string;

    @ManyToMany(()=>UserEntity, u=>u.posts)
    users: UserEntity[];
}
