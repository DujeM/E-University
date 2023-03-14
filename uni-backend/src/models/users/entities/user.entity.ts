/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    role: number;
}
