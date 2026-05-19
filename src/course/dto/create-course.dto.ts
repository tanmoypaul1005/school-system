import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

}
