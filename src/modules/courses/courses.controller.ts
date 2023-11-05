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
import { CoursesService } from './courses.service';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { Prisma } from '@prisma/client';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  private readonly logger = new Logger(CoursesController.name);

  @Get(':courseID')
  async getCourse(@Param('courseID') courseID: string) {
    try {
      const course = await this.coursesService.course({ id: courseID });

      return {
        message: 'Course fetched',
        data: course,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Get('details/byIDs')
  async GetCoursesByIDs(@Body('coursesIDs') coursesIDs: string[]) {
    try {
      const courses = await this.coursesService.findCourses(coursesIDs);

      return {
        message: 'Courses fetched',
        data: courses,
      };
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException();
    }
  }

  @Get()
  async getCourses() {
    try {
      const courses = await this.coursesService.courses();

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
  @Roles('ADMIN')
  async createCourse(@Body() data: Prisma.CourseCreateInput) {
    try {
      const course = await this.coursesService.newCourse(data);

      return {
        message: 'Course created',
        data: course,
      };
    } catch (err) {
      this.logger.error(err);

      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':courseID/update')
  @Roles('ADMIN')
  async updateCourse(
    @Body() data: Prisma.CourseUpdateInput,
    @Param('courseID') courseID: string,
  ) {
    try {
      const course = await this.coursesService.updateCourse(courseID, data);

      return {
        message: 'Course updated',
        data: course,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Post(':courseID/enroll')
  async enrollCourse(
    @Param('courseID') courseID: string,
    @Body('studentModelID') studentModelID: string,
  ) {
    try {
      const course = await this.coursesService.updateEnrolledStudents(
        courseID,
        studentModelID,
      );

      return {
        message: 'Enroll success',
        data: course,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete('/delete')
  @Roles('ADMIN')
  async deleteCourse(@Body() data: any) {
    try {
      await this.coursesService.deleteCourse(data.id);

      return {
        message: 'Course deleted',
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
