import { Test, TestingModule } from '@nestjs/testing';
import { SkuController } from './sku.controller';
import { SkuService } from './sku.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { HttpException } from '@nestjs/common';

describe('SkuController', () => {
  let controller: SkuController;
  let service: SkuService;

  const mockSkuService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkuController],
      providers: [{ provide: SkuService, useValue: mockSkuService }],
    }).compile();
    controller = module.get<SkuController>(SkuController);
    service = module.get<SkuService>(SkuService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a sku', async () => {
      const dto: CreateSkuDto = {
        code: 'SKU',
        price: 10,
        productId: 'pid',
      } as any;
      mockSkuService.create.mockResolvedValue(dto);
      expect(await controller.create(dto)).toEqual(dto);
    });
    it('should throw on error', async () => {
      mockSkuService.create.mockRejectedValue(new Error('fail'));
      await expect(controller.create({} as any)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return skus', async () => {
      const result = [{ id: '1', code: 'SKU' }];
      mockSkuService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a sku', async () => {
      mockSkuService.findOne.mockResolvedValue({ id: '1' });
      expect(await controller.findOne('1')).toEqual({ id: '1' });
    });
    it('should throw if not found', async () => {
      mockSkuService.findOne.mockResolvedValue(null);
      await expect(controller.findOne('x')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a sku', async () => {
      mockSkuService.update.mockResolvedValue({ id: '1', code: 'SKU' });
      expect(
        await controller.update('1', { code: 'SKU' } as UpdateSkuDto),
      ).toEqual({ id: '1', code: 'SKU' });
    });
    it('should throw on error', async () => {
      mockSkuService.update.mockRejectedValue(new Error('fail'));
      await expect(controller.update('1', {} as any)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a sku', async () => {
      mockSkuService.remove.mockResolvedValue(undefined);
      expect(await controller.remove('1')).toBeUndefined();
    });
    it('should throw on error', async () => {
      mockSkuService.remove.mockRejectedValue(new Error('fail'));
      await expect(controller.remove('1')).rejects.toThrow(HttpException);
    });
  });
});
