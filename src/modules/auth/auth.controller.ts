import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @HttpCode(HttpStatus.OK)
  @Post('/students/signin')
  async studentSignIn(
    @Body('studentID') studentID: string,
    @Body('password') password: string,
  ) {
    try {
      const student = await this.authService.studentSignIn(studentID, password);
      return {
        token: student,
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
  ) {
    try {
      const lecturer = await this.authService.lecturerSignIn(
        lecturerID,
        password,
      );
      return {
        token: lecturer,
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
