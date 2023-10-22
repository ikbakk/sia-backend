import { Module } from '@nestjs/common';
import { StudentModule } from './modules/students/students.module';
import { LecturersModule } from './modules/lecturers/lecturers.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [StudentModule, LecturersModule, CoursesModule],
})
export class AppModule {}
