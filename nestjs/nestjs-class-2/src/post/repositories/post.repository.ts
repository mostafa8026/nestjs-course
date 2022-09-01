import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "../entities/post.entity";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    findByName(name: string) {
        return this.find({
            where: {
                name
            }
        })
    }
}