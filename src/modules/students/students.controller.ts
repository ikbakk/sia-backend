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
} from '@nestjs/common';
import { StudentService } from './students.service';
import { Prisma, Student } from '@prisma/client';
import { ErrorRes } from 'src/interfaces/error';
import { SuccessRes } from '../../interfaces/success';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentService: StudentService) {}
  private readonly logger = new Logger(StudentsController.name);

  @Get(':studentID')
  async getStudent(
    @Param('studentID') studentID: string,
  ): Promise<Partial<Student>> {
    return this.studentService.student({ studentID });
  }

  @Get()
  async getStudents(): Promise<SuccessRes<Partial<Student>[]>> {
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

  @Post('/create')
  async createStudent(
    @Body() data: Prisma.StudentCreateInput,
  ): Promise<SuccessRes<Student> | ErrorRes> {
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
