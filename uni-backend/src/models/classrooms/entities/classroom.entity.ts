import { BaseEntity } from 'src/models/base.entity';
import { Event } from 'src/models/events/entities/event.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Classroom extends BaseEntity {
  @Column()
  code: string;

  @OneToMany(() => Event, (event: Event) => event.classroom)
  events: Event[];
}
