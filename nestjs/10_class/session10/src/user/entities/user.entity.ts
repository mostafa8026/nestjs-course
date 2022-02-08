import { Exclude } from 'class-transformer';
import { EventEntity } from 'src/event/entities/event.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((type) => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @Column()
  createdAt: Date = new Date();

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    eager: true,
  })
  @JoinTable()
  roles: RoleEntity[];
}
