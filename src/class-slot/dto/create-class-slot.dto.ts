import { IsDateString } from 'class-validator';

export class CreateClassSlotDto {
  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
