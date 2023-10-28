import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from '../students/students.service';
// import { LecturersService } from '../lecturers/lecturers.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtServices: JwtService,
    private studentService: StudentService, // private lecturersService: LecturersService,
  ) {}

  async studentSignIn(studentID: string, password: string) {
    const student = await this.studentService.student({ studentID });

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: student.id, studentID: student.studentID };
    const token = await this.jwtServices.signAsync(payload);

    return token;
  }
}
