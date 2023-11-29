import { Module } from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaService } from '../prisma/prisma.service';
import { KrsModule } from '../krs/krs.module';
import { GradesModule } from '../grades/grades.module';

@Module({
  imports: [KrsModule, GradesModule],
  controllers: [StudentsController],
  providers: [StudentService, PrismaService],
  exports: [StudentService],
})
export class StudentModule {}
