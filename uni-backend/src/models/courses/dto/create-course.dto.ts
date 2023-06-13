import { IsString, IsUUID } from 'class-validator';
import { User } from 'src/models/users/entities/user.entity';
import { Course } from '../entities/course.entity';
import { Study } from 'src/models/studies/entities/study.entity';
import { Event } from 'src/models/events/entities/event.entity';

export class CourseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  owner: User;

  study: Study;

  events?: Event[];

  public static from(dto: Partial<CourseDto>) {
    const c = new CourseDto();
    c.id = dto.id;
    c.name = dto.name;
    c.code = dto.code;
    c.owner = dto.owner;
    c.study = dto.study;
    return c;
  }

  public static fromEntity(entity: Course) {
    return this.from({
      id: entity.id,
      name: entity.name,
      code: entity.code,
      owner: entity.owner,
      study: entity.study,
      events: entity.events,
    });
  }

  public toEntity() {
    const c = new Course();
    c.id = this.id;
    c.name = this.name;
    c.code = this.code;
    c.owner = this.owner;
    c.study = this.study;
    c.createDateTime = new Date();
    return c;
  }
}
