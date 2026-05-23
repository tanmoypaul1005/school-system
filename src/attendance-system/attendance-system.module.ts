import { Module } from '@nestjs/common';
import { AttendanceSystemController } from './attendance-system.controller';
import { AttendanceSystemService } from './attendance-system.service';

@Module({
  controllers: [AttendanceSystemController],
  
  providers: [AttendanceSystemService]
})
export class AttendanceSystemModule {}
