import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppKeyDto } from './dto/create-app-key.dto';
import { UpdateAppKeyDto } from './dto/update-app-key.dto';
import { AppKeyEntity } from './entities/app-key.entity';

@Injectable()
export class AppKeyService {
  constructor(
    @InjectRepository(AppKeyEntity)
    private readonly appKeyRepository: Repository<AppKeyEntity>,
  ) {}

  create(createAppKeyDto: CreateAppKeyDto) {
    return 'This action adds a new appKey';
  }

  findAll() {
    return `This action returns all appKey`;
  }

  findOne(key: string) {
    return this.appKeyRepository.findOne({
      key
    })
  }

  update(id: number, updateAppKeyDto: UpdateAppKeyDto) {
    return `This action updates a #${id} appKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} appKey`;
  }
}
