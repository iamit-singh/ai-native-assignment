import { ApiProperty } from '@nestjs/swagger';

export class SkuResponseDto {
  @ApiProperty({ description: 'SKU ID', example: 's1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c' })
  id: string;

  @ApiProperty({ description: 'Unique SKU code', example: 'SKU-001' })
  code: string;

  @ApiProperty({ description: 'Price of the SKU', example: 999.99 })
  price: number;

  @ApiProperty({ description: 'Stock quantity', example: 100 })
  stock: number;

  @ApiProperty({ description: 'Product ID to which this SKU belongs', example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d' })
  productId: string;

  @ApiProperty({ description: 'Date SKU was created', example: '2024-06-01T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ description: 'Date SKU was last updated', example: '2024-06-01T12:00:00.000Z' })
  updatedAt: string;
} 