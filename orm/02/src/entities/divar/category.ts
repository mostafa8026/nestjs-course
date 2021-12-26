import { PostEntity } from "./post";
import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Category")
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PostEntity)
  @JoinTable({
    name: "PostCategory",
    joinColumn: {
      name: "categoryId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "postId",
      referencedColumnName: "id",
    },
  })
  posts: PostEntity[];
}
