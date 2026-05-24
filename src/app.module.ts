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
import { ClassSlotModule } from './class-slot/class-slot.module';
import { AttendanceSystemModule } from './attendance-system/attendance-system.module';
import { StudentAssignModule } from './student-assign/student-assign.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ClassModule, SectionModule, CourseModule, CourseAssignModule, ClassSlotModule, AttendanceSystemModule, StudentAssignModule, ProductsModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
