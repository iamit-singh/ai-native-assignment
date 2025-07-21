import { Test, TestingModule } from '@nestjs/testing';
import { SkuService } from './sku.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sku } from '../entities/sku.entity';
import { Product } from '../entities/product.entity';

describe('SkuService', () => {
  let service: SkuService;
  let skuRepo: Repository<Sku>;
  let productRepo: Repository<Product>;

  const mockSkuRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };
  const mockProductRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkuService,
        { provide: getRepositoryToken(Sku), useValue: mockSkuRepo },
        { provide: getRepositoryToken(Product), useValue: mockProductRepo },
      ],
    }).compile();
    service = module.get<SkuService>(SkuService);
    skuRepo = module.get(getRepositoryToken(Sku));
    productRepo = module.get(getRepositoryToken(Product));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create sku if product exists', async () => {
      mockProductRepo.findOne.mockResolvedValue({ id: 'pid' });
      mockSkuRepo.create.mockReturnValue({ code: 'SKU' });
      mockSkuRepo.save.mockResolvedValue({ code: 'SKU' });
      expect(
        await service.create({ code: 'SKU', productId: 'pid' } as any),
      ).toEqual({ code: 'SKU' });
    });
    it('should throw if product not found', async () => {
      mockProductRepo.findOne.mockResolvedValue(null);
      await expect(
        service.create({ code: 'SKU', productId: 'bad' } as any),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return skus', async () => {
      mockSkuRepo.find.mockResolvedValue([{ id: '1', code: 'SKU' }]);
      expect(await service.findAll()).toEqual([{ id: '1', code: 'SKU' }]);
    });
  });

  describe('findOne', () => {
    it('should return a sku', async () => {
      mockSkuRepo.findOne.mockResolvedValue({ id: '1' });
      expect(await service.findOne('1')).toEqual({ id: '1' });
    });
  });

  describe('update', () => {
    it('should update sku if found', async () => {
      mockSkuRepo.findOne.mockResolvedValue({ id: '1' });
      mockSkuRepo.save.mockResolvedValue({ id: '1', code: 'SKU' });
      expect(await service.update('1', { code: 'SKU' } as any)).toEqual({
        id: '1',
        code: 'SKU',
      });
    });
    it('should throw if sku not found', async () => {
      mockSkuRepo.findOne.mockResolvedValue(null);
      await expect(service.update('bad', {} as any)).rejects.toThrow();
    });
    it('should throw if productId is invalid', async () => {
      mockSkuRepo.findOne.mockResolvedValue({ id: '1' });
      mockProductRepo.findOne.mockResolvedValue(null);
      await expect(
        service.update('1', { productId: 'bad' } as any),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove sku if found', async () => {
      mockSkuRepo.delete.mockResolvedValue({ affected: 1 });
      await expect(service.remove('1')).resolves.toBeUndefined();
    });
    it('should throw if not found', async () => {
      mockSkuRepo.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove('bad')).rejects.toThrow();
    });
  });
});
