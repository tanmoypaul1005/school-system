import { Module } from '@nestjs/common';
import { ClassSlotController } from './class-slot.controller';
import { ClassSlotService } from './class-slot.service';

@Module({
  controllers: [ClassSlotController],
  providers: [ClassSlotService]
})
export class ClassSlotModule {}
