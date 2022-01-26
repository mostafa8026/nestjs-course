import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigFields } from 'src/enums/config-fields.enum';
import { Repository } from 'typeorm';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { ConfigEntity } from './entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {}

  getCurrencyValue() {
    return this.configRepository.findOne({
      key: ConfigFields.Currency,
    });
  }

  create(createConfigDto: CreateConfigDto) {
    return 'This action adds a new config';
  }

  findAll() {
    return `This action returns all config`;
  }

  findOne(id: number) {
    return `This action returns a #${id} config`;
  }

  update(id: number, updateConfigDto: UpdateConfigDto) {
    return `This action updates a #${id} config`;
  }

  remove(id: number) {
    return `This action removes a #${id} config`;
  }
}
