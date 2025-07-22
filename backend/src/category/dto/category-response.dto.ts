import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ description: 'Category ID', example: 'c1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c' })
  id: string;

  @ApiProperty({ description: 'Name of the category', example: 'Electronics' })
  name: string;

  @ApiProperty({ description: 'Date category was created', example: '2024-06-01T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ description: 'Date category was last updated', example: '2024-06-01T12:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ description: 'List of products in the category', type: [Object], required: false })
  products?: any[];
} 