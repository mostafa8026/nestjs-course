import {Exclude} from 'class-transformer'

export class UserDto {
  id: number;
  name: string;
  @Exclude()
  password?: string;
}