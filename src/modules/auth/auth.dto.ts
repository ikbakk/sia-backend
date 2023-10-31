import { IsNotEmpty, IsString } from 'class-validator';

export class AuthStudentDto {
  @IsString()
  @IsNotEmpty()
  studentID: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
