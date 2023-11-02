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
} from '@nestjs/common';
import { StudentService } from './students.service';
import { Prisma } from '@prisma/client';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentService: StudentService) {}
  private readonly logger = new Logger(StudentsController.name);

  @Get(':studentID')
  @Roles('ADMIN', 'STUDENT')
  async getStudent(@Param('studentID') studentID: string) {
    return this.studentService.student(studentID);
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
