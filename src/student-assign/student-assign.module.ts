import { Module } from '@nestjs/common';
import { StudentAssignController } from './student-assign.controller';

@Module({
  controllers: [StudentAssignController]
})
export class StudentAssignModule {}
