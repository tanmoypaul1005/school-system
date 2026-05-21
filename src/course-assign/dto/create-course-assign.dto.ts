import { IsBoolean, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateCourseAssignDto {
  @IsUUID()
  courseId: string;

  @IsOptional()
  @IsUUID()
  sectionId?: string;

  @IsOptional()
  @IsUUID()
  classSlotId?: string;

  @IsUUID()
  teacherId: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
