import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { KrsService } from './krs.service';
import { Prisma } from '@prisma/client';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateKrsBody } from './interfaces/krs';
import { StudentService } from '../students/students.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('/api/krs')
export class KrsController {
  constructor(
    private readonly krsService: KrsService,
    private readonly studentService: StudentService,
  ) {}
  private readonly logger = new Logger(KrsController.name);

  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @Get(':studentID')
  async getAllKrs(@Param('studentID') studentID: string) {
    try {
      const data = await this.krsService.allKrs(studentID);

      return {
        message: 'Success',
        data,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @Get(':studentID/:semester')
  async getKrs(
    @Param('studentID') studentID: string,
    @Param('semester') semester: string,
  ) {
    try {
      const data = await this.krsService.krs(studentID, parseInt(semester));

      return {
        message: 'Success',
        data,
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Roles('STUDENT')
  @Post('/create')
  async createKrs(@Body() data: CreateKrsBody) {
    try {
      const student = await this.studentService.student(data.studentID);

      if (!student) throw new Error('Student not found');

      const completedCourses: Prisma.StudentUpdateInput = {
        completedCourses: {
          connect: student.enrolledCoursesIDs.map((c) => ({ id: c })),
        },
      };
      const removeEnrolledCourses: Prisma.StudentUpdateInput = {
        enrolledCourses: {
          disconnect: student.enrolledCoursesIDs.map((c) => ({ id: c })),
        },
      };

      await this.studentService.updateStudent(data.studentID, completedCourses);
      await this.studentService.updateStudent(
        data.studentID,
        removeEnrolledCourses,
      );
      await this.krsService.newKrs(data);

      return {
        message: 'New KRS created',
      };
    } catch (err) {
      this.logger.error(err);
      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException(err.message);
      }

      if (err.name === 'PrismaClientKnownRequestError') {
        throw new BadRequestException(err.message);
      }

      if (err.message === 'Student not found') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException();
    }
  }

  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @Post(':krsID/update')
  async updateKrs(@Param('krsID') krsID: string, @Body() data: CreateKrsBody) {
    try {
      const krs = await this.krsService.krsByID(krsID);
      await this.krsService.updateKrs(krsID, data);

      if (krs && data.status === 'APPROVED') {
        const newData: Prisma.StudentUpdateInput = {
          enrolledCourses: {
            connect: krs.courses.map((c) => ({ id: c })),
          },
        };

        await this.studentService.updateStudent(krs.studentID, newData);
      }

      if (krs && data.status === 'COMPLETED') {
        const newData: Prisma.StudentUpdateInput = {
          completedCourses: {
            connect: krs.courses.map((c) => ({ id: c })),
          },
          enrolledCourses: {
            set: [],
          },
        };

        await this.studentService.updateStudent(krs.studentID, newData);
      }

      return {
        message: 'Update success',
      };
    } catch (err) {
      console.log(err);
      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException();
    }
  }

  @Roles('ADMIN')
  @Delete(':krsID/delete')
  async deleteKrs(@Param('krsID') krsID: string) {
    try {
      await this.krsService.deleteKrs(krsID);

      return {
        message: 'Delete success',
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
