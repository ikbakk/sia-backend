import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthStudentDto } from './auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/students/signin')
  async studentSignIn(
    @Body() dto: AuthStudentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { studentID, password } = dto;
      const student = await this.authService.studentSignIn(studentID, password);

      res.cookie('token', student, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return {
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException('Id atau Password salah');
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
      if (err.name === 'PrismaClientValidationError') {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException();
    }
  }
}
