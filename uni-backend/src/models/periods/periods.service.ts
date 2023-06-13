import { Injectable } from '@nestjs/common';
import { PeriodDto } from './dto/period.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from './entities/period.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeriodsService {
  constructor(
    @InjectRepository(Period)
    private repository: Repository<Period>,
  ) {}

  async create(dto: PeriodDto): Promise<PeriodDto> {
    return await this.repository
      .save(dto.toEntity())
      .then((e) => PeriodDto.fromEntity(e));
  }

  async findAll(): Promise<PeriodDto[]> {
    return await this.repository
      .find({ order: { order: 'ASC' } })
      .then((users) => users.map((e) => PeriodDto.fromEntity(e)));
  }

  async findOne(id: string): Promise<PeriodDto> {
    return await this.repository
      .findOneBy({ id })
      .then((study) => PeriodDto.fromEntity(study));
  }

  async update(id: string, dto: PeriodDto): Promise<PeriodDto> {
    return await this.repository.save(PeriodDto.from({ id, ...dto }));
  }

  async remove(id: string) {
    const study = await this.findOne(id);
    return this.repository.remove(study.toEntity());
  }
}
