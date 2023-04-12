import { IsString, IsUUID } from 'class-validator';
import { Study } from '../entities/study.entity';

export class StudyDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  public static from(dto: Partial<StudyDto>) {
    const s = new StudyDto();
    s.id = dto.id;
    s.name = dto.name;
    s.code = dto.code;
    return s;
  }

  public static fromEntity(entity: Study) {
    return this.from({
      id: entity.id,
      name: entity.name,
      code: entity.code,
    });
  }

  public toEntity() {
    const s = new Study();
    s.id = this.id;
    s.name = this.name;
    s.code = this.code;
    s.createDateTime = new Date();
    return s;
  }
}
