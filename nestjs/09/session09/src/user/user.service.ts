import { UtilityService } from './../utility/utility.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly UtilityService: UtilityService,
  ) {
    this.loggerService.setPrefix('UserService');
    this.loggerService.log('Constructor called');
  }

  findAll() {
    return this.userRepository.find();
  }

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.UtilityService.hashPassword(
      createUserDto.password,
    );
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }
}
