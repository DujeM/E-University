import { Role } from "../enums/role.enum";

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