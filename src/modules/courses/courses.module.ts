import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CoursesService } from './courses.service';

@Module({
  controllers: [CoursesController],
  providers: [PrismaService, CoursesService],
})
export class CoursesModule {}
