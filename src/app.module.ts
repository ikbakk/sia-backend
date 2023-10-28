import { Module } from '@nestjs/common';
import { StudentModule } from './modules/students/students.module';
import { LecturersModule } from './modules/lecturers/lecturers.module';
import { CoursesModule } from './modules/courses/courses.module';
import { GradesModule } from './modules/grades/grades.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StudentModule,
    LecturersModule,
    CoursesModule,
    GradesModule,
    AuthModule,
  ],
})
export class AppModule {}
