/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column("text", { array: true })
    roles: string[];
}
