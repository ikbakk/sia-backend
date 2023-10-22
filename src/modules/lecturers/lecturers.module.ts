import { Module } from '@nestjs/common';
import { LecturersController } from './lecturers.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LecturersService } from './lecturers.service';

@Module({
  controllers: [LecturersController],
  providers: [PrismaService, LecturersService],
})
export class LecturersModule {}
