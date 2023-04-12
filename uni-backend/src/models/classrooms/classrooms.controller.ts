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
import { ClassroomsService } from './classrooms.service';
import { ClassroomDto } from './dto/classroom.dto';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Roles(Role.SUPER_ADMIN)
  @Post()
  create(@Body() classroomDto: ClassroomDto): Promise<ClassroomDto> {
    return this.classroomsService.create(ClassroomDto.from(classroomDto));
  }

  @Get()
  async findAll(): Promise<ClassroomDto[]> {
    return await this.classroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ClassroomDto> {
    return this.classroomsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() classroomDto: ClassroomDto) {
    return this.classroomsService.update(id, classroomDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomsService.remove(id);
  }
}
