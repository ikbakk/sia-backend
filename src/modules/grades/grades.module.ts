import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GradesController],
  providers: [PrismaService, GradesService],
})
export class GradesModule {}
