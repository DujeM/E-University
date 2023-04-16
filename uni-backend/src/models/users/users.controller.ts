import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.SUPER_ADMIN)
  @Post()
  create(@Body() createUserDto: UserDto): Promise<UserDto> {
    return this.usersService.create(UserDto.from(createUserDto));
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/enroll')
  async enrollCourse(
    @Body() createUserCourse: { userId: string; courseId: string },
  ) {
    await this.usersService.enrollCourse(createUserCourse);
  }

  @Get('/courses/:id')
  async getCourses(@Param('id') id: string) {
    return await this.usersService.getCourses(id);
  }

  @Post('/courses/remove')
  async removeCourse(
    @Body() removeUserCourse: { userId: string; courseId: string },
  ) {
    await this.usersService.removeCourse(removeUserCourse);
  }
}
