import { Classroom } from "./classroom.model";
import { Course } from "./course.model";
import { Period } from "./period.model";

export interface Event {
    id: string;
    title: string;
    details: string;
    recurring: boolean;
    startDate: string;
    period: Period;
    classroom: Classroom;
    course: Course;
}

export interface NewEvent {
    title: string;
    details: string;
    recurring: boolean;
    startDate: string;
    period: Period;
    classroom: Classroom;
    course: Course;
}