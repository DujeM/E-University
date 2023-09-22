/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const findUser = await this.usersService.findOneByUsername(user.username);

    if (!findUser) {
      return new Error();
    }

    const payload = {
      id: findUser.id,
      username: findUser.username,
      roles: findUser.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
