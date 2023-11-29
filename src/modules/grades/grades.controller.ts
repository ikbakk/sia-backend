import {
  BadRequestException,
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
import { CreateGradeDto } from './dto/grades.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/courses/:courseID/grades')
export class GradesController {
  constructor(private readonly gradeService: GradesService) {}
  private readonly logger = new Logger(GradesController.name);

  @Get(':gradeID')
  async getGradeDetail(@Param('gradeID') gradeID: string) {
    try {
      const courseGrade = await this.gradeService.grade({ id: gradeID });

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
  // @Roles('ADMIN')
  async createCourseGrade(
    @Param('courseID') courseID: string,
    @Body() data: CreateGradeDto,
  ) {
    try {
      const newGradeData = {
        ...data,
        courseID,
      };
      const newGrade = await this.gradeService.newGrade(newGradeData);
      return {
        message: 'Grade created',
        data: newGrade,
      };
    } catch (err) {
      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException(err.message);
      }
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Put(':gradeID/update')
  @Roles('ADMIN', 'TEACHER')
  async updateGrade(
    @Param('gradeID') gradeID: string,
    @Body() data: Prisma.CourseGradeUpdateInput,
  ) {
    try {
      const updatedGrade = await this.gradeService.updateGrade(gradeID, data);

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
  // @Roles('ADMIN')
  async deleteGrade(@Body('gradeID') gradeID: string) {
    try {
      await this.gradeService.deleteGrade(gradeID);

      return {
        message: 'Grade deleted',
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
