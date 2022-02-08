import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/enums/roles.enum';
import { LoggerService } from 'src/logger/logger.service';
import { UpdateRoleDto } from 'src/role/dto/update-role.dto';
import { RoleEntity } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { UtilityService } from 'src/utility/utility.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserRoleDto } from './dtos/update-user-role.dto';
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

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async create(data: CreateUserDto) {
    console.log('data is: ', data);
    data.password = this.utilityService.hash(data.password);

    const roles = await Promise.all(
      data.roles.map(async (role) => {
        return await this.roleService.preloadRole(role as RoleEnum);
      }),
    );

    console.log(roles);

    const user = this.userRepository.create({
      ...data,
      roles,
    });

    console.log('user after create, ', user);

    return this.userRepository.save(user);
  }

  async updateRole(id: number, data: UpdateUserRoleDto) {
    const roles = await Promise.all(
      data.roles.map(async (role) => {
        return await this.roleService.preloadRole(role as RoleEnum);
      }),
    );

    const user = await this.userRepository.preload({ id, ...data, roles });
    console.log('update user, ', user);
    return this.userRepository.save(user);
  }
}
