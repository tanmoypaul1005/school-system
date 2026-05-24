import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
