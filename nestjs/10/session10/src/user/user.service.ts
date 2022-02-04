import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/logger.service';
import { RoleService } from 'src/role/role.service';
import { UtilityService } from 'src/utility/utility.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly utilityService: UtilityService,
    private readonly roleService: RoleService,
  ) {
    this.loggerService.setPrefix('UserService');
    this.loggerService.log('Constructor called');
  }

  findAll() {
    return this.userRepository.find();
  }

  async create(data: CreateUserDto) {
    data.password = this.utilityService.hash(data.password);
    const roles = await Promise.all(
      data.roles.map((_item) => this.preloadRole(_item)),
    );
    const user = this.userRepository.create({
      ...data,
      roles,
    });
    return this.userRepository.save(user);
  }

  async update(id: number, data: UpdateUserDto) {
    const roles = await Promise.all(
      data.roles.map((_item) => this.preloadRole(_item)),
    );

    const user = await this.userRepository.preload({
      id,
      ...data,
      roles,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.save(user);
  }

  async preloadRole(_item: string) {
    const role = await this.roleService.findOne(_item);

    if (role) {
      return role;
    } else {
      return this.roleService.create({ name: _item });
    }
  }
}
