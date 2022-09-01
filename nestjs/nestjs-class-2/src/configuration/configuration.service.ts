import { Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { ConfigurationEntity } from './entities/configuration.entity';
import { ConfigurationRepository } from './repositories/configuration.repository';

@Injectable()
export class ConfigurationService {
  constructor(private readonly _configurationRepository: ConfigurationRepository){}

  create(createConfigurationDto: CreateConfigurationDto) {
    const entity = new ConfigurationEntity(createConfigurationDto);
    return this._configurationRepository.save(entity);
  }

  findAll() {
    return this._configurationRepository.find();
  }

  findOne(key: string) {
    return this._configurationRepository.findOne(key);
  }

  update(id: number, updateConfigurationDto: UpdateConfigurationDto) {
    return `This action updates a #${id} configuration`;
  }

  remove(id: number) {
    return `This action removes a #${id} configuration`;
  }
}
