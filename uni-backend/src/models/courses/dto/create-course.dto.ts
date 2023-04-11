import { IsString, IsUUID } from 'class-validator';
import { User } from 'src/models/users/entities/user.entity';
import { Course } from '../entities/course.entity';

export class CourseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  owner: User;

  public static from(dto: Partial<CourseDto>) {
    const c = new CourseDto();
    c.id = dto.id;
    c.name = dto.name;
    c.code = dto.code;
    c.owner = dto.owner;
    return c;
  }

  public static fromEntity(entity: Course) {
    return this.from({
      id: entity.id,
      name: entity.name,
      code: entity.code,
      owner: entity.owner,
    });
  }

  public toEntity() {
    const c = new Course();
    c.id = this.id;
    c.name = this.name;
    c.code = this.code;
    c.owner = this.owner;
    c.createDateTime = new Date();
    return c;
  }
}
