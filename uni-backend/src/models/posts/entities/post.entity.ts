import { BaseEntity } from 'src/models/base.entity';
import { Course } from 'src/models/courses/entities/course.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  fileName: string;

  @ManyToOne(() => Course, (course: Course) => course.posts)
  course: Course;
}
