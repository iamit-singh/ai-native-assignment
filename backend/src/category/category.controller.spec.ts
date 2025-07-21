import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { HttpException } from '@nestjs/common';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }],
    }).compile();
    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto: CreateCategoryDto = { name: 'Test' };
      mockCategoryService.create.mockResolvedValue(dto);
      expect(await controller.create(dto)).toEqual(dto);
    });
    it('should throw on error', async () => {
      mockCategoryService.create.mockRejectedValue(new Error('fail'));
      await expect(controller.create({} as any)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return categories', async () => {
      const result = [{ id: '1', name: 'Test' }];
      mockCategoryService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      mockCategoryService.findOne.mockResolvedValue({ id: '1' });
      expect(await controller.findOne('1')).toEqual({ id: '1' });
    });
    it('should throw if not found', async () => {
      mockCategoryService.findOne.mockResolvedValue(null);
      await expect(controller.findOne('x')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      mockCategoryService.update.mockResolvedValue({
        id: '1',
        name: 'Updated',
      });
      expect(
        await controller.update('1', { name: 'Updated' } as UpdateCategoryDto),
      ).toEqual({ id: '1', name: 'Updated' });
    });
    it('should throw on error', async () => {
      mockCategoryService.update.mockRejectedValue(new Error('fail'));
      await expect(controller.update('1', {} as any)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      mockCategoryService.remove.mockResolvedValue(undefined);
      expect(await controller.remove('1')).toBeUndefined();
    });
    it('should throw on error', async () => {
      mockCategoryService.remove.mockRejectedValue(new Error('fail'));
      await expect(controller.remove('1')).rejects.toThrow(HttpException);
    });
  });
});
