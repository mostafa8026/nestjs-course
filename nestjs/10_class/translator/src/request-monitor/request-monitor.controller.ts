import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestMonitorService } from './request-monitor.service';
import { CreateRequestMonitorDto } from './dto/create-request-monitor.dto';
import { UpdateRequestMonitorDto } from './dto/update-request-monitor.dto';

@Controller('request-monitor')
export class RequestMonitorController {
  constructor(private readonly requestMonitorService: RequestMonitorService) {}

  @Get('avg-duration')
  findAll() {
    return this.requestMonitorService.getAverageDuration();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestMonitorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestMonitorDto: UpdateRequestMonitorDto) {
    return this.requestMonitorService.update(+id, updateRequestMonitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestMonitorService.remove(+id);
  }
}
