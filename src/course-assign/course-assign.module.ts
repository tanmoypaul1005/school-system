import { Module } from '@nestjs/common';
import { CourseAssignController } from './course-assign.controller';
import { CourseAssignService } from './course-assign.service';

@Module({
  controllers: [CourseAssignController],
  providers: [CourseAssignService]
})
export class CourseAssignModule {}
