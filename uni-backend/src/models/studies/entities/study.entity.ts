import { BaseEntity } from 'src/models/base.entity';
import { Course } from 'src/models/courses/entities/course.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Study extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany(() => Course, (course: Course) => course.study)
  courses: Course[];
}
