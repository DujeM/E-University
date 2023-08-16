import { Post } from "./post.model";
import { Study } from "./study.model";
import { User } from "./user.model";

export interface Course {
    id: string;
    name: string;
    code: string;
    owner: User;
    study: Study;
    posts: Post[];
}

export interface NewCourse {
    name: string;
    code: string;
    owner: User;
    study: Study;
}