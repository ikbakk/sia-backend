import { Module } from '@nestjs/common';
import { StudentModule } from './modules/students/students.module';

@Module({
  imports: [StudentModule],
})
export class AppModule {}
