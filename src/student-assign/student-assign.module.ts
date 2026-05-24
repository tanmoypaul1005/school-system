import { Module } from '@nestjs/common';
import { StudentAssignController } from './student-assign.controller';
import { StudentAssignService } from './student-assign.service';

@Module({
  controllers: [StudentAssignController],
  providers: [StudentAssignService]
})
export class StudentAssignModule {}
