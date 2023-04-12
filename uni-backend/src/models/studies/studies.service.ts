import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyDto } from './dto/study.dto';
import { Study } from './entities/study.entity';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private repository: Repository<Study>,
  ) {}

  async create(dto: StudyDto): Promise<StudyDto> {
    return await this.repository
      .save(dto.toEntity())
      .then((e) => StudyDto.fromEntity(e));
  }

  async findAll(): Promise<StudyDto[]> {
    return await this.repository
      .find()
      .then((users) => users.map((e) => StudyDto.fromEntity(e)));
  }

  async findOne(id: string): Promise<StudyDto> {
    return await this.repository
      .findOneBy({ id })
      .then((study) => StudyDto.fromEntity(study));
  }

  async update(id: string, dto: StudyDto): Promise<StudyDto> {
    return await this.repository.save(StudyDto.from({ id, ...dto }));
  }

  async remove(id: string) {
    const study = await this.findOne(id);
    return this.repository.remove(study.toEntity());
  }
}
