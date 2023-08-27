/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/models/base.entity';
import { Classroom } from 'src/models/classrooms/entities/classroom.entity';
import { Course } from 'src/models/courses/entities/course.entity';
import { Period } from 'src/models/periods/entities/period.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Event extends BaseEntity {
    @Column()
    title: string;

    @Column()
    details: string;

    @Column()
    recurring: boolean;

    @Column()
    startDate: string;

    @Column()
    day: number;

    @Column("text", { array: true, nullable: true })
    canceledDates: string[];

    @ManyToOne(() => Period, (period: Period) => period.events)
    period: Period;

    @ManyToOne(() => Classroom, (classroom: Classroom) => classroom.events)
    classroom: Classroom;

    @ManyToOne(() => Course, (course: Course) => course.events)
    course: Course;
}
