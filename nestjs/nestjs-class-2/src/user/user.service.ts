import { Injectable } from '@nestjs/common';
import { IPService } from 'src/utils/ip.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {

  constructor(private ipService: IPService, private userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto) {
    const ip = await this.ipService.getIP();
    console.log(ip.body);
    const userEntity = new UserEntity();
    userEntity.name = createUserDto.name;
    userEntity.ip = ip.body.trim();
    return this.userRepository.create(userEntity);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
