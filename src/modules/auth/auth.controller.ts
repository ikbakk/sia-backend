import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @HttpCode(HttpStatus.OK)
  @Post('/students/signin')
  async studentSignIn(
    @Body('studentID') studentID: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const student = await this.authService.studentSignIn(studentID, password);

      res.cookie('token', student, { httpOnly: true });
      return {
        message: 'Success',
      };
    } catch (err) {
      this.logger.error(err);

      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/lecturers/signin')
  async lecturerSignIn(
    @Body('lecturerID') lecturerID: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const lecturer = await this.authService.lecturerSignIn(
        lecturerID,
        password,
      );

      res.cookie('token', lecturer, { httpOnly: true });
      return {
        message: 'Success',
      };
    } catch (err) {
      this.logger.error(err);

      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException();
    }
  }
}
