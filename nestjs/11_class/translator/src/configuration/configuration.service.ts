import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { ConfigurationEntity } from './entities/configuration.entity';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(ConfigurationEntity)
    private configurationRepository: Repository<ConfigurationEntity>,
  ) {}

  create(createConfigurationDto: CreateConfigurationDto) {
    const configEntity = new ConfigurationEntity();
    configEntity.key = createConfigurationDto.key;
    configEntity.value = createConfigurationDto.value;
    return this.configurationRepository.save(configEntity);
  }

  async get(key: string) {
    const config = await this.configurationRepository.findOneBy({
      key
    })
    return config.value;
  }

  findAll() {
    return `This action returns all configuration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configuration`;
  }

  update(id: number, updateConfigurationDto: UpdateConfigurationDto) {
    return `This action updates a #${id} configuration`;
  }

  remove(id: number) {
    return `This action removes a #${id} configuration`;
  }
}
