import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exceptionLog')
export class ExceptionLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  statusCode: number;

  @Column()
  error: string;

  @Column()
  createdAt: Date;
}
