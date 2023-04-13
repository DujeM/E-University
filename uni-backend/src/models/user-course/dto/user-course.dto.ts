import { IsString } from 'class-validator';
import { Course } from 'src/models/courses/entities/course.entity';
import { User } from 'src/models/users/entities/user.entity';
import { UserCourse } from '../entities/user-course.entity';

export class UserCourseDto {
  @IsString()
  userId: string;

  @IsString()
  courseId: string;

  users: User[];

  courses: Course[];

  public static from(dto: Partial<UserCourseDto>) {
    const c = new UserCourseDto();
    c.userId = dto.userId;
    c.courseId = dto.courseId;
    c.users = dto.users;
    c.courses = dto.courses;
    return c;
  }

  public static fromEntity(entity: UserCourse) {
    return this.from({
      userId: entity.userId,
      courseId: entity.courseId,
      users: entity.users,
      courses: entity.courses,
    });
  }

  public toEntity() {
    const c = new UserCourse();
    c.userId = this.userId;
    c.courseId = this.courseId;
    c.users = this.users;
    c.courses = this.courses;
    return c;
  }
}
