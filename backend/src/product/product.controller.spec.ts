import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();
    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto: CreateProductDto = {
        name: 'Test',
        categoryId: 'catid',
        description: 'desc',
      };
      mockProductService.create.mockResolvedValue(dto);
      expect(await controller.create(dto)).toEqual(dto);
    });
    it('should throw on error', async () => {
      mockProductService.create.mockRejectedValue(new Error('fail'));
      await expect(controller.create({} as any)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return products', async () => {
      const result = { data: [], total: 0, page: 1, pageSize: 20 };
      mockProductService.findAll.mockResolvedValue(result);
      expect(await controller.findAll({} as SearchProductDto)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      mockProductService.findOne.mockResolvedValue({ id: '1' });
      expect(await controller.findOne('1')).toEqual({ id: '1' });
    });
    it('should throw if not found', async () => {
      mockProductService.findOne.mockResolvedValue(null);
      await expect(controller.findOne('x')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      mockProductService.update.mockResolvedValue({ id: '1', name: 'Updated' });
      expect(
        await controller.update('1', { name: 'Updated' } as UpdateProductDto),
      ).toEqual({ id: '1', name: 'Updated' });
    });
    it('should throw on error', async () => {
      mockProductService.update.mockRejectedValue(new Error('fail'));
      await expect(controller.update('1', {} as any)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      mockProductService.remove.mockResolvedValue(undefined);
      expect(await controller.remove('1')).toBeUndefined();
    });
    it('should throw on error', async () => {
      mockProductService.remove.mockRejectedValue(new Error('fail'));
      await expect(controller.remove('1')).rejects.toThrow(HttpException);
    });
  });
});
