import { Controller, Get, Req } from '@nestjs/common';
import { StudentService } from './students.service';
import { Student } from '@prisma/client';
import { Request } from 'express';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getStudent(@Req() request: Request): Promise<Student> {
    const { email } = request.body as { email: string };
    return this.studentService.student({ email });
  }
}
