import { BaseEntity } from 'src/models/base.entity';
import { Event } from 'src/models/events/entities/event.entity';
import { Post } from 'src/models/posts/entities/post.entity';
import { Study } from 'src/models/studies/entities/study.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(() => User, (owner: User) => owner.courses)
  owner: User;

  @ManyToOne(() => Study, (study: Study) => study.courses)
  study: Study;

  @OneToMany(() => Event, (event: Event) => event.course)
  events: Event[];

  @ManyToMany(() => User, (user) => user.enrolledCourses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  students?: User[];

  @OneToMany(() => Post, (post: Post) => post.course)
  posts: Post[];
}
