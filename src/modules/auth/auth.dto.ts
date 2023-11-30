import { IsNotEmpty, IsString } from 'class-validator';

export class AuthStudentDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  studentID: string;
}
