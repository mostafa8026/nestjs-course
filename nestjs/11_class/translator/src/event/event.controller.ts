import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventDTO } from './dtos/event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post('/like')
  like(@Body() eventLike: EventDTO) {
    return this.eventService.like(eventLike);
  }

  @Get('')
  async getAll() {
    const events = await this.eventService.findAll();
    return {
      total: events.length,
      events
    }
  }
}
