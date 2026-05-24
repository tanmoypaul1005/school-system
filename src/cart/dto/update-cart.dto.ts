import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
