import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { gradeMappings } from 'src/libs/gradeMappings';
import { CreateGradeDto } from './dto/grades.dto';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async grade(whereInput: Prisma.CourseGradeWhereUniqueInput) {
    return this.prisma.courseGrade.findUnique({
      where: whereInput,
    });
  }

  async grades() {
    return this.prisma.courseGrade.findMany();
  }

  async newGrade(data: CreateGradeDto) {
    const finalScore = (data.finalExam + data.midTerm) / 2;
    let grade: string;

    const matchingGrade = gradeMappings.find(
      (mapping) =>
        finalScore >= mapping.minScore && finalScore <= mapping.maxScore,
    );

    if (matchingGrade) {
      grade = matchingGrade.grade;
    } else {
      grade = 'K';
    }

    return this.prisma.courseGrade.create({
      data: {
        midTerm: data.midTerm,
        finalExam: data.finalExam,
        courseID: data.courseID,
        studentID: data.studentID,
        finalScore,
        grade,
      },
    });
  }

  async updateGrade(gradeID: string, data: Prisma.CourseGradeUpdateInput) {
    return this.prisma.courseGrade.update({
      where: { id: gradeID },
      data,
    });
  }

  async deleteGrade(gradeID: string) {
    return this.prisma.courseGrade.delete({
      where: { id: gradeID },
    });
  }
}
