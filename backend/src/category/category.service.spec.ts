import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let repo: Repository<Category>;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: getRepositoryToken(Category), useValue: mockRepo },
      ],
    }).compile();
    service = module.get<CategoryService>(CategoryService);
    repo = module.get(getRepositoryToken(Category));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      mockRepo.create.mockReturnValue({ name: 'Test' });
      mockRepo.save.mockResolvedValue({ name: 'Test' });
      expect(await service.create({ name: 'Test' } as any)).toEqual({
        name: 'Test',
      });
    });
    it('should throw on error', async () => {
      mockRepo.create.mockImplementation(() => {
        throw new Error('fail');
      });
      await expect(service.create({ name: 'fail' } as any)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return categories', async () => {
      mockRepo.find.mockResolvedValue([{ id: '1', name: 'Test' }]);
      expect(await service.findAll()).toEqual([{ id: '1', name: 'Test' }]);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      mockRepo.findOne.mockResolvedValue({ id: '1' });
      expect(await service.findOne('1')).toEqual({ id: '1' });
    });
  });

  describe('update', () => {
    it('should update category if found', async () => {
      mockRepo.findOne.mockResolvedValue({ id: '1' });
      mockRepo.save.mockResolvedValue({ id: '1', name: 'Updated' });
      expect(await service.update('1', { name: 'Updated' } as any)).toEqual({
        id: '1',
        name: 'Updated',
      });
    });
    it('should throw if not found', async () => {
      mockRepo.findOne.mockResolvedValue(null);
      await expect(service.update('bad', {} as any)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove category if found', async () => {
      mockRepo.delete.mockResolvedValue({ affected: 1 });
      await expect(service.remove('1')).resolves.toBeUndefined();
    });
    it('should throw if not found', async () => {
      mockRepo.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove('bad')).rejects.toThrow();
    });
  });
});
