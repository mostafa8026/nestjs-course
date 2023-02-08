import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IPService } from 'src/utils/ip.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { Request } from 'express'

@Injectable({
  scope: Scope.REQUEST
})
export class UserService {

  constructor(
    private ipService: IPService,
    private userRepository: UserRepository,
    @Inject(REQUEST) private readonly request: Request
  ) { }

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
    const enString = `This action returns a #${id} user`;
    if (this.request.headers['accept-language'] == 'fa') {
      return 'فارسی';
    } else {
      return enString;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
