import { Module } from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentService, PrismaService],
  exports: [StudentService],
})
export class StudentModule {}
