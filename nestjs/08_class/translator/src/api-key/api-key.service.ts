import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKeyEntity } from 'src/api-key/entities/api-key.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import create from 'got/dist/source/create';

@Injectable()
export class ApiKeyService {

  constructor(
    @InjectRepository(ApiKeyEntity)
    private readonly _apiKeyRepository : Repository<ApiKeyEntity>,
    private readonly _userService: UserService
  ){}

  async create(createApiKeyDto: CreateApiKeyDto) {
    const user = await this._userService.findOne(createApiKeyDto.userId);
    if(!user) {
      throw new NotFoundException('user not found');
    }

    return this._apiKeyRepository.save({
      user
    })
  }

  findAll() {
    return this._apiKeyRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} apiKey`;
  }

  update(id: number, updateApiKeyDto: UpdateApiKeyDto) {
    return `This action updates a #${id} apiKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} apiKey`;
  }
}
