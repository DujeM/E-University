import { Role } from "../enums/role.enum";
import { Course } from "./course.model";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    roles: Role[];
}

export interface NewUser {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    roles: Role[];
}

export interface UserCourse {
    userId: string;
    courseId: string;
    users: User;
    courses: Course;
}
