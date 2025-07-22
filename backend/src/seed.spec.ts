jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(true),
      getRepository: jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue(undefined),
        create: jest.fn().mockImplementation((x) => x),
        save: jest.fn().mockResolvedValue(true),
      }),
      destroy: jest.fn().mockResolvedValue(true),
    })),
  };
});
jest.mock('dotenv', () => ({ config: jest.fn() }));

describe('seed.ts', () => {
  it('should run seed without error', async () => {
    const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    const spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    await import('./seed');
    spyLog.mockRestore();
    spyWarn.mockRestore();
    spyError.mockRestore();
  });

  it('should skip creating category if it already exists', async () => {
    jest.resetModules();
    const mockFindOne = jest.fn().mockResolvedValue({ id: 1, name: 'Electronics' });
    const mockCreate = jest.fn();
    const mockSave = jest.fn();
    const mockGetRepository = jest.fn().mockReturnValue({
      findOne: mockFindOne,
      create: mockCreate,
      save: mockSave,
    });
    const mockDataSource = {
      initialize: jest.fn().mockResolvedValue(true),
      getRepository: mockGetRepository,
      destroy: jest.fn().mockResolvedValue(true),
    };
    const typeorm = require('typeorm');
    typeorm.DataSource.mockImplementation(() => mockDataSource);
    const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    await import('./seed');
    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockSave).not.toHaveBeenCalled();
    spyLog.mockRestore();
  });

  it('should skip creating product if it already exists', async () => {
    jest.resetModules();
    const mockFindOne = jest
      .fn()
      .mockResolvedValueOnce({ id: 1, name: 'Electronics' }) // category
      .mockResolvedValueOnce({ id: 2, name: 'Smartphone' }); // product exists
    const mockCreate = jest.fn();
    const mockSave = jest.fn();
    const mockGetRepository = jest.fn().mockReturnValue({
      findOne: mockFindOne,
      create: mockCreate,
      save: mockSave,
    });
    const mockDataSource = {
      initialize: jest.fn().mockResolvedValue(true),
      getRepository: mockGetRepository,
      destroy: jest.fn().mockResolvedValue(true),
    };
    const typeorm = require('typeorm');
    typeorm.DataSource.mockImplementation(() => mockDataSource);
    const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    await import('./seed');
    expect(mockCreate).not.toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Smartphone' })
    );
    expect(mockSave).not.toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Smartphone' })
    );
    spyLog.mockRestore();
  });

  it('should skip creating SKU if it already exists', async () => {
    jest.resetModules();
    const mockFindOne = jest
      .fn()
      .mockResolvedValueOnce({ id: 1, name: 'Smartphone' }) // product
      .mockResolvedValueOnce({ id: 3, code: 'SM-001' }); // SKU exists
    const mockCreate = jest.fn();
    const mockSave = jest.fn();
    const mockGetRepository = jest.fn().mockReturnValue({
      findOne: mockFindOne,
      create: mockCreate,
      save: mockSave,
    });
    const mockDataSource = {
      initialize: jest.fn().mockResolvedValue(true),
      getRepository: mockGetRepository,
      destroy: jest.fn().mockResolvedValue(true),
    };
    const typeorm = require('typeorm');
    typeorm.DataSource.mockImplementation(() => mockDataSource);
    const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    await import('./seed');
    expect(mockCreate).not.toHaveBeenCalledWith(
      expect.objectContaining({ code: 'SM-001' })
    );
    expect(mockSave).not.toHaveBeenCalledWith(
      expect.objectContaining({ code: 'SM-001' })
    );
    spyLog.mockRestore();
  });

}); 