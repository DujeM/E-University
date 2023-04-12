import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassroomDto } from './dto/classroom.dto';
import { Classroom } from './entities/classroom.entity';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private repository: Repository<Classroom>,
  ) {}

  async create(dto: ClassroomDto): Promise<ClassroomDto> {
    return await this.repository
      .save(dto.toEntity())
      .then((e) => ClassroomDto.fromEntity(e));
  }

  async findAll(): Promise<ClassroomDto[]> {
    return await this.repository
      .find()
      .then((users) => users.map((e) => ClassroomDto.fromEntity(e)));
  }

  async findOne(id: string): Promise<ClassroomDto> {
    return await this.repository
      .findOneBy({ id })
      .then((study) => ClassroomDto.fromEntity(study));
  }

  async update(id: string, dto: ClassroomDto): Promise<ClassroomDto> {
    return await this.repository.save(ClassroomDto.from({ id, ...dto }));
  }

  async remove(id: string) {
    const study = await this.findOne(id);
    return this.repository.remove(study.toEntity());
  }
}
