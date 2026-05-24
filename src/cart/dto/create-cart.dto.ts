import { IsBoolean, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsUUID()
  productId: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
