import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}

  async create(dto: PostDto): Promise<PostDto> {
    return await this.repository
      .save(dto.toEntity())
      .then((e) => PostDto.fromEntity(e));
  }

  async findAll(): Promise<PostDto[]> {
    return await this.repository
      .find({ relations: ['course'] })
      .then((events) => events.map((e) => PostDto.fromEntity(e)));
  }

  async findOne(id: string): Promise<PostDto> {
    return await this.repository
      .findOneBy({ id })
      .then((study) => PostDto.fromEntity(study));
  }

  async update(id: string, dto: PostDto): Promise<PostDto> {
    return await this.repository.save(PostDto.from({ id, ...dto }));
  }

  async remove(id: string) {
    const study = await this.findOne(id);
    return this.repository.remove(study.toEntity());
  }
}
