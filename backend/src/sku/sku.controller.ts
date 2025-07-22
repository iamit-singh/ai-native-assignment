import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SkuService } from './sku.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { ApiOperation, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkuResponseDto } from './dto/sku-response.dto';

@ApiTags('SKUs')
@Controller('skus')
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new SKU' })
  @ApiBody({ type: CreateSkuDto })
  @ApiResponse({
    status: 201,
    description: 'SKU created successfully',
    type: SkuResponseDto,
    schema: {
      example: {
        id: 's1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
        code: 'SKU-001',
        price: 999.99,
        stock: 100,
        productId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: { example: { message: 'Validation failed' } }
  })
  async create(@Body() createSkuDto: CreateSkuDto) {
    try {
      return await this.skuService.create(createSkuDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of SKUs' })
  @ApiResponse({
    status: 200,
    description: 'List of SKUs',
    type: SkuResponseDto,
    isArray: true,
    schema: {
      type: 'array',
      items: {
        example: {
          id: 's1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
          code: 'SKU-001',
          price: 999.99,
          stock: 100,
          productId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
          createdAt: '2024-06-01T12:00:00.000Z',
          updatedAt: '2024-06-01T12:00:00.000Z'
        }
      }
    }
  })
  async findAll() {
    return this.skuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a SKU by ID' })
  @ApiParam({ name: 'id', description: 'SKU ID' })
  @ApiResponse({
    status: 200,
    description: 'SKU found',
    type: SkuResponseDto,
    schema: {
      example: {
        id: 's1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
        code: 'SKU-001',
        price: 999.99,
        stock: 100,
        productId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'SKU not found',
    schema: { example: { message: 'SKU not found' } }
  })
  async findOne(@Param('id') id: string) {
    const sku = await this.skuService.findOne(id);
    if (!sku) {
      throw new HttpException(
        { message: 'SKU not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return sku;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a SKU by ID' })
  @ApiParam({ name: 'id', description: 'SKU ID' })
  @ApiBody({ type: UpdateSkuDto })
  @ApiResponse({
    status: 200,
    description: 'SKU updated successfully',
    type: SkuResponseDto,
    schema: {
      example: {
        id: 's1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
        code: 'SKU-001',
        price: 999.99,
        stock: 100,
        productId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: { example: { message: 'Validation failed' } }
  })
  async update(@Param('id') id: string, @Body() updateSkuDto: UpdateSkuDto) {
    try {
      return await this.skuService.update(id, updateSkuDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a SKU by ID' })
  @ApiParam({ name: 'id', description: 'SKU ID' })
  @ApiResponse({
    status: 200,
    description: 'SKU deleted successfully',
    schema: { example: { message: 'SKU deleted successfully' } }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: { example: { message: 'Validation failed' } }
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.skuService.remove(id);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
