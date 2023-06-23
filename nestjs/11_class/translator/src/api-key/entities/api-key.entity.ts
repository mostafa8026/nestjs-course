import { UserEntity } from './../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('apiKey')
export class ApiKeyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  apiKey: string;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.apiKeys)
  user: UserEntity;
}
