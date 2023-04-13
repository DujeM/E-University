import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourseDto } from '../user-course/dto/user-course.dto';
import { UserCourse } from '../user-course/entities/user-course.entity';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
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

  async enrollCourse(createUserCourse: {
    userId: string;
    courseId: string;
  }): Promise<void> {
    const student = await this.findOne(createUserCourse.userId);

    if (!student) {
      throw new NotFoundException();
    }

    await this.userCourseRepository.save(createUserCourse);
  }

  async getCourses(userId: string): Promise<UserCourseDto[]> {
    const student = await this.findOne(userId);

    if (!student) {
      throw new NotFoundException();
    }

    return await this.userCourseRepository
      .find({
        where: { userId },
        relations: ['users', 'courses'],
      })
      .then((userCourses) =>
        userCourses.map((uc) => UserCourseDto.fromEntity(uc)),
      );
  }
}
