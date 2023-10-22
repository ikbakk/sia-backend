import { Module } from '@nestjs/common';
import { StudentModule } from './modules/students/students.module';
import { LecturersModule } from './modules/lecturers/lecturers.module';
import { CoursesModule } from './modules/courses/courses.module';
import { GradesModule } from './modules/grades/grades.module';

@Module({
  imports: [StudentModule, LecturersModule, CoursesModule, GradesModule],
})
export class AppModule {}
