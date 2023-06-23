import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Post()
  create(@Body() createConfigurationDto: CreateConfigurationDto) {
    return this.configurationService.create(createConfigurationDto);
  }

  @Get()
  findAll() {
    return this.configurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configurationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfigurationDto: UpdateConfigurationDto) {
    return this.configurationService.update(+id, updateConfigurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configurationService.remove(+id);
  }
}
