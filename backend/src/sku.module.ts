import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sku } from './entities/sku.entity';
import { Product } from './entities/product.entity';
import { SkuController } from './sku/sku.controller';
import { SkuService } from './sku/sku.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sku, Product])],
  controllers: [SkuController],
  providers: [SkuService],
  exports: [SkuService],
})
export class SkuModule {}
