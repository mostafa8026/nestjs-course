import { Body, Controller, Post } from '@nestjs/common';
import { EventDTO } from './dtos/event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('/like')
  like(@Body() eventLike: EventDTO) {
    return this.eventService.like(eventLike);
  }
}
