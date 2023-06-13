import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Raw, Repository } from 'typeorm';
import { EventDto } from './dto/event.dto';
import { UsersService } from '../users/users.service';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
    private usersService: UsersService,
  ) {}

  async create(dto: EventDto): Promise<EventDto> {
    return await this.repository
      .save(dto.toEntity())
      .then((e) => EventDto.fromEntity(e));
  }

  async findAll(): Promise<EventDto[]> {
    return await this.repository
      .find({ relations: ['period', 'classroom', 'course'] })
      .then((events) => events.map((e) => EventDto.fromEntity(e)));
  }

  async findOne(id: string): Promise<EventDto> {
    return await this.repository
      .findOneBy({ id })
      .then((study) => EventDto.fromEntity(study));
  }

  async update(id: string, dto: EventDto): Promise<EventDto> {
    return await this.repository.save(EventDto.from({ id, ...dto }));
  }

  async remove(id: string) {
    const study = await this.findOne(id);
    return this.repository.remove(study.toEntity());
  }

  async findPersonal(userId: string): Promise<EventDto[]> {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new NotFoundException();
    }

    const coursesIds = user.roles.includes(Role.USER)
      ? user.enrolledCourses.map((c) => c.id)
      : user.courses.map((c) => c.id);

    return await this.repository
      .find({
        where: {
          course: Raw((alias) => `${alias} IN (:...coursesIds)`, {
            coursesIds: coursesIds,
          }),
        },
        relations: ['period', 'classroom', 'course'],
      })
      .then((events) => events.map((e) => EventDto.fromEntity(e)));
  }
}
