import { BaseEntity } from 'src/models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Study extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}
