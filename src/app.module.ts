import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { SectionModule } from './section/section.module';
import { CourseModule } from './course/course.module';
import { CourseAssignModule } from './course-assign/course-assign.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ClassModule, SectionModule, CourseModule, CourseAssignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
