import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Period } from '../entities/period.entity';

export class PeriodDto {
  @IsUUID()
  id: string;

  @IsNumber()
  order: number;

  @IsString()
  start: string;

  @IsString()
  end: string;

  public static from(dto: Partial<PeriodDto>) {
    const s = new PeriodDto();
    s.id = dto.id;
    s.order = dto.order;
    s.start = dto.start;
    s.end = dto.end;
    return s;
  }

  public static fromEntity(entity: Period) {
    return this.from({
      id: entity.id,
      order: entity.order,
      start: entity.start,
      end: entity.end,
    });
  }

  public toEntity() {
    const s = new Period();
    s.id = this.id;
    s.order = this.order;
    s.start = this.start;
    s.end = this.end;
    s.createDateTime = new Date();
    return s;
  }
}
