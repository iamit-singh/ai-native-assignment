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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';
import { ProductResponseDto } from './dto/product-response.dto';

@ApiTags('Products')
@ApiExtraModels(SearchProductDto)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'iPhone 15',
        description: 'Latest Apple smartphone',
        categoryId: 'b3b7c8e2-1d2f-4e5a-9c3d-2f1b2c3d4e5f',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z',
        skus: []
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: { message: 'Validation failed' }
    }
  })
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of products with optional filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: ProductResponseDto,
    isArray: true,
    schema: {
      type: 'array',
      items: {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'iPhone 15',
          description: 'Latest Apple smartphone',
          categoryId: 'b3b7c8e2-1d2f-4e5a-9c3d-2f1b2c3d4e5f',
          createdAt: '2024-06-01T12:00:00.000Z',
          updatedAt: '2024-06-01T12:00:00.000Z',
          skus: []
        }
      }
    }
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: SearchProductDto) {
    return await this.productService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: ProductResponseDto,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'iPhone 15',
        description: 'Latest Apple smartphone',
        categoryId: 'b3b7c8e2-1d2f-4e5a-9c3d-2f1b2c3d4e5f',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z',
        skus: []
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    schema: {
      example: { message: 'Product not found' }
    }
  })
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: ProductResponseDto,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'iPhone 15',
        description: 'Latest Apple smartphone',
        categoryId: 'b3b7c8e2-1d2f-4e5a-9c3d-2f1b2c3d4e5f',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z',
        skus: []
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: { message: 'Validation failed' }
    }
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await this.productService.update(id, updateProductDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
    schema: {
      example: { message: 'Product deleted successfully' }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      example: { message: 'Validation failed' }
    }
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.productService.remove(id);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
