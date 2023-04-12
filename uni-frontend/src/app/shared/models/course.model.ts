import { User } from "./user.model";

export interface Course {
    id: string;
    name: string;
    code: string;
    owner: User;
}

export interface NewCourse {
    name: string;
    code: string;
    owner: User;
}