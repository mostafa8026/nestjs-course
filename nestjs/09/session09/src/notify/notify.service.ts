import { Injectable } from '@nestjs/common';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UpdateNotifyDto } from './dto/update-notify.dto';

@Injectable()
export class NotifyService {
  create(createNotifyDto: CreateNotifyDto) {
    return 'This action adds a new notify';
  }

  findAll() {
    return `This action returns all notify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notify`;
  }

  update(id: number, updateNotifyDto: UpdateNotifyDto) {
    return `This action updates a #${id} notify`;
  }

  remove(id: number) {
    return `This action removes a #${id} notify`;
  }
}
