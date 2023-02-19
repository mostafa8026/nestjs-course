import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../models/user';

export class UserService {
  private user: User;

  constructor() {
    this.user = new User();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = plainToInstance(CreateUserDto, dto);
    const validationErrors = await validate(user);
    if (validationErrors) {
      throw validationErrors;
    }
    const existingUser = await this.user.findByEmail(user.email);
    if (existingUser) {
      throw new Error('User with that email already exists');
    }
    return this.user.create(user);
  }
}
