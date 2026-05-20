import { IsString } from 'class-validator';

export class CreateClassSlotDto {
  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
