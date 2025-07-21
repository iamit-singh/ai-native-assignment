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

@Controller('skus')
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Post()
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
  async findAll() {
    return this.skuService.findAll();
  }

  @Get(':id')
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
