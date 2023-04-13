import { Course } from 'src/models/courses/entities/course.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class UserCourse {
  @PrimaryColumn({ name: 'userId' })
  userId: string;

  @PrimaryColumn({ name: 'courseId' })
  courseId: string;

  @ManyToOne(() => User, (user) => user.enrolledCourses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => Course, (course) => course.students, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'courseId', referencedColumnName: 'id' }])
  courses: Course[];
}
