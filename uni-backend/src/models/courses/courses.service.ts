import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private repository: Repository<Course>,
  ) {}

  async create(dto: CourseDto): Promise<CourseDto> {
    return await this.repository
      .save(dto.toEntity())
      .then((e) => CourseDto.fromEntity(e));
  }

  async findAll(): Promise<CourseDto[]> {
    return await this.repository
      .find()
      .then((courses) => courses.map((e) => CourseDto.fromEntity(e)));
  }

  async findOne(id: string): Promise<CourseDto> {
    return await this.repository
      .findOneBy({ id })
      .then((course) => CourseDto.fromEntity(course));
  }

  async findOneByCode(code: string): Promise<CourseDto> {
    return await this.repository
      .findOneBy({ code })
      .then((course) => CourseDto.fromEntity(course));
  }

  async update(id: string, dto: CourseDto): Promise<CourseDto> {
    return await this.repository.save(CourseDto.from({ id, ...dto }));
  }

  async remove(id: string) {
    const course = await this.findOne(id);
    return this.repository.remove(course.toEntity());
  }
}
