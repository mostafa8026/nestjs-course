import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('request-monitor')
export class RequestMonitorEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  method: string;

  @Column()
  @IsString()
  url: string;

  @Column('simple-json', { nullable: true })
  @IsObject()
  requestPayload: Record<string, any>;

  @Column('simple-json', { nullable: true })
  @IsObject()
  responsePayload: Record<string, any>;

  @Column()
  @IsNumber()
  duration: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;
}
