import { Injectable } from '@nestjs/common';
import { CreateRequestMonitorDto } from './dto/create-request-monitor.dto';
import { UpdateRequestMonitorDto } from './dto/update-request-monitor.dto';
import { Request, Response } from 'express';
import { RequestMonitorEntity } from 'src/request-monitor/entities/request-monitor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RequestMonitorService {

  constructor(
    @InjectRepository(RequestMonitorEntity)
    private readonly _reqMonitorRepostiroy: Repository<RequestMonitorEntity>
  ){}

  create(req: Request, res: Response, duration: number, id?: number) {
    const method = req.method;
    const url = req.originalUrl;
    console.log('body', req.body)
    // const requestPayload = {
    //   body: req.body,
    //   headers: req.headers
    // }
    // const responsePayload = {
    //   body: res.,
    //   headers: res.getHeaders()
    // }
    const reqMonitorEntity = new RequestMonitorEntity();
    reqMonitorEntity.method = method;
    reqMonitorEntity.url = url;
    // reqMonitorEntity.requestPayload = requestPayload;
    // reqMonitorEntity.responsePayload = responsePayload;
    reqMonitorEntity.duration = duration;
    reqMonitorEntity.id = id;

    return this._reqMonitorRepostiroy.save(reqMonitorEntity);
  }

  async getAverageDuration() {
    const avg = await this._reqMonitorRepostiroy.average('duration');
    console.log('avg', avg);
    return avg;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestMonitor`;
  }

  update(id: number, updateRequestMonitorDto: UpdateRequestMonitorDto) {
    return `This action updates a #${id} requestMonitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestMonitor`;
  }
}
