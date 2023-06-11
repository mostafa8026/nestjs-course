import { Body, Controller, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from './dtos/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('/like')
  createEvent(@Body() body: CreateEventDTO) {
    return this.eventService.likeEvent(body);
  }
}
