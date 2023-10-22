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
import { CoursesService } from './courses.service';

@Controller('courses')
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
  async createCourse(@Body() data: any) {
    try {
      const course = await this.coursesService.newCourse(data);

      return {
        message: 'Course created',
        data: course,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Put('/update')
  async updateCourse(@Body() data: any) {
    try {
      const course = await this.coursesService.updateCourse(data.id, data);

      return {
        message: 'Course updated',
        data: course,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Delete('/delete')
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
