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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category-response.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    type: CategoryResponseDto,
    schema: {
      example: {
        id: 'c1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
        name: 'Electronics',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z',
        products: []
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: { example: { message: 'Validation failed' } }
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategoryDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    type: CategoryResponseDto,
    isArray: true,
    schema: {
      type: 'array',
      items: {
        example: {
          id: 'c1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
          name: 'Electronics',
          createdAt: '2024-06-01T12:00:00.000Z',
          updatedAt: '2024-06-01T12:00:00.000Z',
          products: []
        }
      }
    }
  })
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category found',
    type: CategoryResponseDto,
    schema: {
      example: {
        id: 'c1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
        name: 'Electronics',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z',
        products: []
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
    schema: { example: { message: 'Category not found' } }
  })
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new HttpException(
        { message: 'Category not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: CategoryResponseDto,
    schema: {
      example: {
        id: 'c1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
        name: 'Electronics',
        createdAt: '2024-06-01T12:00:00.000Z',
        updatedAt: '2024-06-01T12:00:00.000Z',
        products: []
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: { example: { message: 'Validation failed' } }
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoryService.update(id, updateCategoryDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully',
    schema: { example: { message: 'Category deleted successfully' } }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: { example: { message: 'Validation failed' } }
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.categoryService.remove(id);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
