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
import { AuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
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
  @Roles('ADMIN')
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
  @Roles('ADMIN', 'TEACHER')
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
  @Roles('ADMIN')
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
