import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GradesService } from './grades.service';
import { Prisma } from '@prisma/client';

@Controller('courses/grades')
export class GradesController {
  constructor(private readonly gradeService: GradesService) {}
  private readonly logger = new Logger(GradesController.name);

  @Get(':courseID')
  async getCourse(@Param('courseID') courseID: string) {
    try {
      const course = await this.gradeService.grade({ id: courseID });

      return {
        message: 'Course fetched',
        data: course,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async getCourses() {
    try {
      const courses = await this.gradeService.grades();

      return {
        message: 'Courses fetched',
        data: courses,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Post('/create')
  async createCourse(@Body() data: Prisma.CourseGradeCreateInput) {
    try {
      const course = await this.gradeService.newGrade(data);

      return {
        message: 'Course created',
        data: course,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Put(':courseID/update')
  async updateCourse(
    @Param() courseID: string,
    @Body() data: Prisma.CourseGradeUpdateInput,
  ) {
    try {
      const course = await this.gradeService.updateGrade(courseID, data);

      return {
        message: 'Course updated',
        data: course,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':courseID/delete')
  async deleteCourse(@Param() courseID: string) {
    try {
      await this.gradeService.deleteGrade(courseID);

      return {
        message: 'Course deleted',
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
