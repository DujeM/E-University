import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { StudyDto } from './dto/study.dto';
import { StudiesService } from './studies.service';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Roles(Role.SUPER_ADMIN)
  @Post()
  create(@Body() studyDto: StudyDto): Promise<StudyDto> {
    return this.studiesService.create(StudyDto.from(studyDto));
  }

  @Get()
  async findAll(): Promise<StudyDto[]> {
    return await this.studiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StudyDto> {
    return this.studiesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() studyDto: StudyDto) {
    return this.studiesService.update(id, studyDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studiesService.remove(id);
  }
}
