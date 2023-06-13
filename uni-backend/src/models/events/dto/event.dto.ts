import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Classroom } from 'src/models/classrooms/entities/classroom.entity';
import { Course } from 'src/models/courses/entities/course.entity';
import { Period } from 'src/models/periods/entities/period.entity';
import { Event } from '../entities/event.entity';

export class EventDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  details: string;

  @IsBoolean()
  recurring: boolean;

  @IsString()
  startDate: string;

  period: Period;

  classroom: Classroom;

  course: Course;

  public static from(dto: Partial<EventDto>) {
    const s = new EventDto();
    s.id = dto.id;
    s.title = dto.title;
    s.details = dto.details;
    s.startDate = dto.startDate;
    s.recurring = dto.recurring;
    s.period = dto.period;
    s.classroom = dto.classroom;
    s.course = dto.course;
    return s;
  }

  public static fromEntity(entity: Event) {
    return this.from({
      id: entity.id,
      title: entity.title,
      details: entity.details,
      startDate: entity.startDate,
      recurring: entity.recurring,
      period: entity.period,
      classroom: entity.classroom,
      course: entity.course,
    });
  }

  public toEntity() {
    const s = new Event();
    s.id = this.id;
    s.title = this.title;
    s.details = this.details;
    s.startDate = this.startDate;
    s.recurring = this.recurring;
    s.period = this.period;
    s.classroom = this.classroom;
    s.course = this.course;
    s.createDateTime = new Date();
    return s;
  }
}
