import { IsString, IsUUID } from 'class-validator';
import { Classroom } from '../entities/classroom.entity';
import { Event } from 'src/models/events/entities/event.entity';

export class ClassroomDto {
  @IsUUID()
  id: string;

  @IsString()
  code: string;

  events?: Event[];

  public static from(dto: Partial<ClassroomDto>) {
    const c = new ClassroomDto();
    c.id = dto.id;
    c.code = dto.code;
    return c;
  }

  public static fromEntity(entity: Classroom) {
    return this.from({
      id: entity.id,
      code: entity.code,
      events: entity.events,
    });
  }

  public toEntity() {
    const c = new Classroom();
    c.id = this.id;
    c.code = this.code;
    c.createDateTime = new Date();
    return c;
  }
}
