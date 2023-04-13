/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/models/base.entity';
import { Course } from 'src/models/courses/entities/course.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

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

    @OneToMany(() => Course, (course: Course) => course.owner)
    courses: Course[];

    @ManyToMany(
        () => Course, 
        course => course.students,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
        @JoinTable({
          name: 'user_course',
          joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
          },
          inverseJoinColumn: {
            name: 'courseId',
            referencedColumnName: 'id',
          },
        })
        enrolledCourses?: Course[];
}
