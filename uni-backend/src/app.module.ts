import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { configService } from './config/config.service';
import { UsersModule } from './models/users/users.module';
import { CoursesModule } from './models/courses/courses.module';
import { StudiesModule } from './models/studies/studies.module';
import { ClassroomsModule } from './models/classrooms/classrooms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    CoursesModule,
    StudiesModule,
    ClassroomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
