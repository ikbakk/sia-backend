import { Module } from '@nestjs/common';
import { StudentModule } from './modules/students/students.module';
import { LecturersModule } from './modules/lecturers/lecturers.module';

@Module({
  imports: [StudentModule, LecturersModule],
  providers: [],
})
export class AppModule {}
