import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodDto } from './dto/period.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Roles(Role.SUPER_ADMIN)
  @Post()
  create(@Body() createPeriodDto: PeriodDto) {
    return this.periodsService.create(PeriodDto.from(createPeriodDto));
  }

  @Get()
  findAll() {
    return this.periodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePeriodDto: PeriodDto) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}
