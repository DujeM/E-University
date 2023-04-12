import { Module } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Study } from './entities/study.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Study])],
  controllers: [StudiesController],
  providers: [StudiesService],
  exports: [StudiesService],
})
export class StudiesModule {}
