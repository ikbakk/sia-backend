import { Module, forwardRef } from '@nestjs/common';
import { KrsController } from './krs.controller';
import { PrismaService } from '../prisma/prisma.service';
import { KrsService } from './krs.service';
import { StudentModule } from '../students/students.module';

@Module({
  imports: [forwardRef(() => StudentModule)],
  controllers: [KrsController],
  providers: [PrismaService, KrsService],
  exports: [KrsService],
})
export class KrsModule {}
