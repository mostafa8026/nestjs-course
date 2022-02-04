import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { UtilityService } from 'src/utility/utility.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly utilityService: UtilityService,
  ) {
    this.loggerService.setPrefix('UserService');
    this.loggerService.log('Constructor called');
  }

  findAll() {
    return this.userRepository.find();
  }

  create(data: CreateUserDto) {
    data.password = this.utilityService.hash(data.password);
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}
