import { Role } from "../enums/role.enum";

export interface TokenResponse {
    access_token: string;
}

export interface DecodedToken {
    exp: number;
    iat: number
    id: string
    roles: Role[]
    username: string;
}