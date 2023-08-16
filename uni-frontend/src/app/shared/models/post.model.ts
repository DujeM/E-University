import { Course } from "./course.model";

export interface Post {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    fileName: string;
}

export interface NewPost {
    title: string;
    description: string;
    fileUrl: string;
    course: Course;
    fileName: string;
}