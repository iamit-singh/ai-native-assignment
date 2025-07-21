import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sku } from '../entities/sku.entity';
import { Product } from '../entities/product.entity';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';

@Injectable()
export class SkuService {
  constructor(
    @InjectRepository(Sku)
    private readonly skuRepository: Repository<Sku>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createSkuDto: CreateSkuDto): Promise<Sku> {
    const product = await this.productRepository.findOne({
      where: { id: createSkuDto.productId },
    });
    if (!product) {
      throw new BadRequestException('Invalid productId');
    }
    const sku = this.skuRepository.create(createSkuDto);
    return this.skuRepository.save(sku);
  }

  async findAll(): Promise<Sku[]> {
    return this.skuRepository.find({ relations: ['product'] });
  }

  async findOne(id: string): Promise<Sku | null> {
    return this.skuRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async update(id: string, updateSkuDto: UpdateSkuDto): Promise<Sku> {
    const sku = await this.skuRepository.findOne({ where: { id } });
    if (!sku) {
      throw new NotFoundException('SKU not found');
    }
    if (updateSkuDto.productId) {
      const product = await this.productRepository.findOne({
        where: { id: updateSkuDto.productId },
      });
      if (!product) {
        throw new BadRequestException('Invalid productId');
      }
    }
    Object.assign(sku, updateSkuDto);
    return this.skuRepository.save(sku);
  }

  async remove(id: string): Promise<void> {
    const result = await this.skuRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('SKU not found');
    }
  }
}
