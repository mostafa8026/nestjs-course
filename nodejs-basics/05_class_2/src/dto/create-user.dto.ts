import { IsNumber, IsString } from 'class-validator';


export class CreateUserDto {

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  @IsNumber()
  id: number;

  @IsString()
  name: string;
}