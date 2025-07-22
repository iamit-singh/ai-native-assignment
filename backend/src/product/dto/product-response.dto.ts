import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ description: 'Product ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Name of the product', example: 'iPhone 15' })
  name: string;

  @ApiProperty({ description: 'Product description', example: 'Latest Apple smartphone', required: false })
  description?: string;

  @ApiProperty({ description: 'Category ID', example: 'b3b7c8e2-1d2f-4e5a-9c3d-2f1b2c3d4e5f' })
  categoryId: string;

  @ApiProperty({ description: 'Date product was created', example: '2024-06-01T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ description: 'Date product was last updated', example: '2024-06-01T12:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ description: 'List of SKUs for the product', type: [Object], required: false })
  skus?: any[];
} 