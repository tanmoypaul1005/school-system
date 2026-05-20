import { IsDateString, IsOptional } from 'class-validator';

export class UpdateClassSlotDto {
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;
}
