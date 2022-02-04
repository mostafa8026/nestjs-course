import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<UserEntity> {
  findByUsername(username: string) {
    return this.findOne({ username });
  }
}
