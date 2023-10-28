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
  UseGuards,
} from '@nestjs/common';
import { GradesService } from './grades.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/courses/:courseID/grades')
export class GradesController {
  constructor(private readonly gradeService: GradesService) {}
  private readonly logger = new Logger(GradesController.name);

  @Get(':gradeID')
  async getGradeDetail(@Param('courseID') courseID: string) {
    try {
      const courseGrade = await this.gradeService.grade({ id: courseID });

      return {
        message: 'Grade detail fetched',
        data: courseGrade,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async getGrades() {
    try {
      const grades = await this.gradeService.grades();

      return {
        message: 'Grades fetched',
        data: grades,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Post()
  async createCourseGrade(@Body() data: Prisma.CourseGradeCreateInput) {
    try {
      const newGrade = await this.gradeService.newGrade(data);

      return {
        message: 'Grade created',
        data: newGrade,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Put('/update')
  async updateGrade(
    @Param() courseID: string,
    @Body() data: Prisma.CourseGradeUpdateInput,
  ) {
    try {
      const updatedGrade = await this.gradeService.updateGrade(courseID, data);

      return {
        message: 'Grade updated',
        data: updatedGrade,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Delete('/delete')
  async deleteGrade(@Param() courseID: string) {
    try {
      await this.gradeService.deleteGrade(courseID);

      return {
        message: 'Grade deleted',
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
