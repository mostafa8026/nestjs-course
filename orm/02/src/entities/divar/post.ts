import { CategoryEntity } from "./category";
import {
  Entity,
  BaseEntity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Post")
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "nvarchar",
  })
  title: string;

  @Column({
    type: "nvarchar",
  })
  text: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable({
    name: "PostCategory",
    joinColumn: {
      name: "postId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "categoryId",
      referencedColumnName: "id",
    },
  })
  posts: CategoryEntity[];
}
