import { BaseEntity } from 'src/models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Classroom extends BaseEntity {
  @Column()
  code: string;
}
