import { Module, forwardRef } from '@nestjs/common';
import { KrsController } from './krs.controller';
import { PrismaService } from '../prisma/prisma.service';
import { KrsService } from './krs.service';
import { StudentModule } from '../students/students.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [forwardRef(() => StudentModule), CoursesModule],
  controllers: [KrsController],
  providers: [PrismaService, KrsService],
  exports: [KrsService],
})
export class KrsModule {}
