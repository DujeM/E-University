import { BaseEntity } from 'src/models/base.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(() => User, (owner: User) => owner.courses)
  owner: User;
}
