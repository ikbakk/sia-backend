import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from '../students/students.service';
import { LecturersService } from '../lecturers/lecturers.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtServices: JwtService,
    private studentService: StudentService,
    private lecturersService: LecturersService,
  ) {}

  async studentSignIn(studentID: string, password: string) {
    const student = await this.studentService.studentAuthInfo(studentID);

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: student.id,
      studentID: student.studentID,
      role: student.role,
    };
    const token = await this.jwtServices.signAsync(payload);

    return token;
  }

  async lecturerSignIn(lecturerID: string, password: string) {
    const lecturer = await this.lecturersService.lecturer(lecturerID);

    const isMatch = await bcrypt.compare(password, lecturer.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: lecturer.id,
      lecturerID: lecturer.lecturerID,
      role: lecturer.role,
    };
    const token = await this.jwtServices.signAsync(payload);

    return token;
  }
}
