import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Logger,
  Put,
  InternalServerErrorException,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { StudentService } from './students.service';
import { Prisma } from '@prisma/client';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { KrsService } from '../krs/krs.service';
import { GradesService } from '../grades/grades.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/students')
export class StudentsController {
  constructor(
    private readonly studentService: StudentService,
    private readonly krsService: KrsService,
    private readonly gradeService: GradesService,
  ) {}
  private readonly logger = new Logger(StudentsController.name);

  @Get(':studentID')
  @Roles('ADMIN', 'STUDENT')
  async getStudent(@Param('studentID') studentID: string) {
    return this.studentService.student(studentID);
  }

  @Get(':studentID/grades')
  @Roles('ADMIN', 'STUDENT')
  async getStudentGrades(@Param('studentID') studentID: string) {
    try {
      const grades = await this.gradeService.studentGrades(studentID);

      if (!grades) {
        throw new NotFoundException('No student with given ID');
      }

      return {
        message: 'Grades fetched',
        data: grades,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async getStudents() {
    try {
      const students = await this.studentService.students();

      return {
        message: 'Students fetched',
        data: students,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Roles('ADMIN', 'STUDENT')
  @Get(':studentID/courses/active')
  async getEnrolledCourses(@Param('studentID') studentID: string) {
    try {
      const enrolledCourses =
        await this.studentService.studentActiveCourses(studentID);

      return {
        message: 'Enrolled courses fetched',
        data: enrolledCourses.enrolledCourses,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
  @Roles('ADMIN', 'STUDENT')
  @Get(':studentID/courses/completed')
  async getCompletedCourses(@Param('studentID') studentID: string) {
    try {
      const completedCourses =
        await this.studentService.studentCompletedCourses(studentID);

      return {
        message: 'Completed courses fetched',
        data: completedCourses.completedCourses,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Put(':studentID/courses/active')
  async updateEnrolledCourses(
    @Param('studentID') studentID: string,
    @Body('krsID') krsID: string,
  ) {
    try {
      const approvedKrs = await this.krsService.approvedKrsCourses(krsID);

      if (!approvedKrs) {
        throw new Error('There is no krs approved');
      }

      const newData: Prisma.StudentUpdateInput = {
        enrolledCourses: {
          connect: approvedKrs.courses.map((c) => ({ id: c })),
        },
      };
      const updatedStudent = await this.studentService.updateStudent(
        studentID,
        newData,
      );

      return {
        message: 'Enrolled courses updated',
        data: updatedStudent,
      };
    } catch (error) {
      this.logger.error(error);

      if (error.message === 'There is no krs approved') {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }

  @Post('/create')
  @Roles('ADMIN')
  async createStudent(@Body() data: Prisma.StudentCreateInput) {
    try {
      await this.studentService.newStudent(data);

      return {
        message: 'New student created',
      };
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException();
    }
  }

  @Put(':studentID')
  @Roles('ADMIN', 'STUDENT')
  async updateStudent(
    @Param('studentID') studentID: string,
    @Body() data: Prisma.StudentUpdateInput,
  ) {
    try {
      await this.studentService.updateStudent(studentID, data);

      return {
        message: 'Student updated',
      };
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException();
    }
  }
}
