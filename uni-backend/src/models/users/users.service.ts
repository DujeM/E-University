import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(dto: UserDto): Promise<UserDto> {
    return await this.repository
      .save(dto.toEntity())
      .then((e) => UserDto.fromEntity(e));
  }

  async findAll(): Promise<UserDto[]> {
    return await this.repository
      .find()
      .then((users) => users.map((e) => UserDto.fromEntity(e)));
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.repository
      .findOneBy({ id })
      .then((user) => UserDto.fromEntity(user));
  }

  async findOneByUsername(username: string): Promise<UserDto> {
    return await this.repository
      .findOneBy({ username })
      .then((user) => UserDto.fromEntity(user));
  }

  async update(id: string, dto: UserDto): Promise<UserDto> {
    return await this.repository.save(UserDto.from({ id, ...dto }));
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.repository.remove(user.toEntity());
  }
}
