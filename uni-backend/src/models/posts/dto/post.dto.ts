import { IsString, IsUUID } from 'class-validator';
import { Course } from 'src/models/courses/entities/course.entity';
import { Post } from '../entities/post.entity';

export class PostDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  fileUrl: string;

  @IsString()
  fileName: string;

  course: Course;

  public static from(dto: Partial<PostDto>) {
    const s = new PostDto();
    s.id = dto.id;
    s.title = dto.title;
    s.description = dto.description;
    s.fileUrl = dto.fileUrl;
    s.fileName = dto.fileName;
    s.course = dto.course;
    return s;
  }

  public static fromEntity(entity: Post) {
    return this.from({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      fileUrl: entity.fileUrl,
      fileName: entity.fileName,
      course: entity.course,
    });
  }

  public toEntity() {
    const s = new Post();
    s.id = this.id;
    s.title = this.title;
    s.description = this.description;
    s.fileUrl = this.fileUrl;
    s.fileName = this.fileName;
    s.course = this.course;
    s.createDateTime = new Date();
    return s;
  }
}
