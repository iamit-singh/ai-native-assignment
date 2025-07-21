import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';

describe('ProductService', () => {
  let service: ProductService;
  let productRepo: Repository<Product>;
  let categoryRepo: Repository<Category>;

  const mockProductRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
    delete: jest.fn(),
  };
  const mockCategoryRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getRepositoryToken(Product), useValue: mockProductRepo },
        { provide: getRepositoryToken(Category), useValue: mockCategoryRepo },
      ],
    }).compile();
    service = module.get<ProductService>(ProductService);
    productRepo = module.get(getRepositoryToken(Product));
    categoryRepo = module.get(getRepositoryToken(Category));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create product if category exists', async () => {
      mockCategoryRepo.findOne.mockResolvedValue({ id: 'catid' });
      mockProductRepo.create.mockReturnValue({ name: 'Test' });
      mockProductRepo.save.mockResolvedValue({ name: 'Test' });
      expect(
        await service.create({ name: 'Test', categoryId: 'catid' } as any),
      ).toEqual({ name: 'Test' });
    });
    it('should throw if category not found', async () => {
      mockCategoryRepo.findOne.mockResolvedValue(null);
      await expect(
        service.create({ name: 'Test', categoryId: 'bad' } as any),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const qb: any = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[{ id: 1 }], 1]),
      };
      mockProductRepo.createQueryBuilder.mockReturnValue(qb);
      const result = await service.findAll({} as any);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      mockProductRepo.findOne.mockResolvedValue({ id: '1' });
      expect(await service.findOne('1')).toEqual({ id: '1' });
    });
  });

  describe('update', () => {
    it('should update product if found', async () => {
      mockProductRepo.findOne.mockResolvedValue({ id: '1' });
      mockProductRepo.save.mockResolvedValue({ id: '1', name: 'Updated' });
      expect(await service.update('1', { name: 'Updated' } as any)).toEqual({
        id: '1',
        name: 'Updated',
      });
    });
    it('should throw if product not found', async () => {
      mockProductRepo.findOne.mockResolvedValue(null);
      await expect(service.update('bad', {} as any)).rejects.toThrow();
    });
    it('should throw if categoryId is invalid', async () => {
      mockProductRepo.findOne.mockResolvedValue({ id: '1' });
      mockCategoryRepo.findOne.mockResolvedValue(null);
      await expect(
        service.update('1', { categoryId: 'bad' } as any),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove product if found', async () => {
      mockProductRepo.delete = jest.fn().mockResolvedValue({ affected: 1 });
      await expect(service.remove('1')).resolves.toBeUndefined();
    });
    it('should throw if not found', async () => {
      mockProductRepo.delete = jest.fn().mockResolvedValue({ affected: 0 });
      await expect(service.remove('bad')).rejects.toThrow();
    });
  });
});
