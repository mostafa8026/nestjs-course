import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotifyService } from './notify.service';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UpdateNotifyDto } from './dto/update-notify.dto';
import { privateDecrypt } from 'crypto';
import { ParseMoneyPipe } from 'src/common/pipes/parse-money.pipe';
import { isPublic } from 'src/common/guards/is-public.decorator';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post('/:category/:price')
  @isPublic()
  create(@Param('price', ParseMoneyPipe) price, @Param('category') category) {
    return `category: ${category}, price: ${price}`;
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
