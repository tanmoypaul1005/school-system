import { IsOptional, IsString } from 'class-validator';

export class UpdateClassSlotDto {
  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;
}
