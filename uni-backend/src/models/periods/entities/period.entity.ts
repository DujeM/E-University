import { BaseEntity } from 'src/models/base.entity';
import { Event } from 'src/models/events/entities/event.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Period extends BaseEntity {
  @Column({ unique: true })
  order: number;

  @Column()
  start: string;

  @Column()
  end: string;

  @OneToMany(() => Event, (event: Event) => event.period)
  events: Event[];
}
