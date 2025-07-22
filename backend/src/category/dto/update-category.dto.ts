import { IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'Name of the category', example: 'Electronics', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;
}
