import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  classId?: string;
}
