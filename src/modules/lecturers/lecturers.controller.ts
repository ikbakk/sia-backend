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
import { LecturersService } from './lecturers.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/lecturers')
export class LecturersController {
  constructor(private readonly lecturersService: LecturersService) {}
  private readonly logger = new Logger(LecturersController.name);

  @Get(':lecturerID')
  async getLecturer(@Param('lecturerID') lecturerID: string) {
    try {
      const lecturer = await this.lecturersService.lecturer(lecturerID);

      return {
        message: 'Lecturer fetched',
        data: lecturer,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async getLecturers() {
    try {
      const lecturers = await this.lecturersService.lecturers();

      return {
        message: 'Lecturers fetched',
        data: lecturers,
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Post('/create')
  async createLecturer(@Body() data: Prisma.LecturerCreateInput) {
    try {
      await this.lecturersService.newLecturer(data);

      return {
        message: 'New lecturer created',
      };
    } catch (err) {
      this.logger.error(err);

      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Put(':lecturerID')
  async updateLecturer(
    @Param('lecturerID') lecturerID: string,
    @Body() data: Prisma.LecturerUpdateInput,
  ) {
    try {
      await this.lecturersService.updateLecturer(lecturerID, data);

      return {
        message: 'Lecturer updated',
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Delete()
  async deleteLecturer(@Body() lecturerID: string) {
    try {
      await this.lecturersService.deleteLecturer(lecturerID);

      return {
        message: 'Lecturer deleted',
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
