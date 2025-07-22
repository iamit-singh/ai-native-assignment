import { IsString, MaxLength, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'iPhone 15', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  name?: string;

  @ApiProperty({ description: 'Product description', example: 'Latest Apple smartphone', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Category ID to which the product belongs', example: 'b3b7c8e2-1d2f-4e5a-9c3d-2f1b2c3d4e5f', required: false })
  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
