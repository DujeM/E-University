import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto } from './dto/event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: EventDto) {
    return this.eventsService.create(EventDto.from(createEventDto));
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Get('/personal/:id')
  findPersonal(@Param('id') id: string) {
    return this.eventsService.findPersonal(id);
  }

  @Get('/day/:day')
  findAllByDay(@Param('day') day: string) {
    return this.eventsService.findAllByDay(day);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: EventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
