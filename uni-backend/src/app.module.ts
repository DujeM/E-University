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
import { EventsModule } from './models/events/events.module';
import { PeriodsModule } from './models/periods/periods.module';
import { PostsModule } from './models/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    CoursesModule,
    StudiesModule,
    ClassroomsModule,
    EventsModule,
    PeriodsModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
