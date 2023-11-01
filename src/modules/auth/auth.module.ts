import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentModule } from '../students/students.module';
import { JwtModule } from '@nestjs/jwt';
import { LecturersModule } from '../lecturers/lecturers.module';

@Module({
  imports: [
    LecturersModule,
    StudentModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
