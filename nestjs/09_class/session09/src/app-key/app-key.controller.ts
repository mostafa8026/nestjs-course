import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppKeyService } from './app-key.service';
import { CreateAppKeyDto } from './dto/create-app-key.dto';
import { UpdateAppKeyDto } from './dto/update-app-key.dto';

@Controller('app-key')
@ApiTags('Application Keys Controller')
export class AppKeyController {
  constructor(private readonly appKeyService: AppKeyService) {}

  @Post()
  @ApiTags('Post')
  create(@Body() createAppKeyDto: CreateAppKeyDto) {
    return this.appKeyService.create(createAppKeyDto);
  }

  @Get()
  findAll() {
    return this.appKeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppKeyDto: UpdateAppKeyDto) {
    return this.appKeyService.update(+id, updateAppKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appKeyService.remove(+id);
  }
}
