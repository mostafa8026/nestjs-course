import { EventEntity } from 'src/event/entities/event.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];
}
