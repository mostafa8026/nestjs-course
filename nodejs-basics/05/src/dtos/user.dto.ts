import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';

export class CreateUserDto implements UserInterface {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
