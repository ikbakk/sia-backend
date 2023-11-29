import { IsString, IsNumber } from 'class-validator';

export class CreateGradeDto {
  @IsString()
  studentID: string;

  @IsString()
  courseID: string;

  @IsNumber()
  midTerm: number;

  @IsNumber()
  finalExam: number;
}
