import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UpdateNotifyDto } from './dto/update-notify.dto';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post()
  create(@Body() createNotifyDto: CreateNotifyDto) {
    return this.notifyService.create(createNotifyDto);
  }

  @Get()
  findAll() {
    return this.notifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotifyDto: UpdateNotifyDto) {
    return this.notifyService.update(+id, updateNotifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifyService.remove(+id);
  }
}
