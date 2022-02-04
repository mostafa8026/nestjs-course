import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  @JoinTable()
  users: UserEntity[];
}
