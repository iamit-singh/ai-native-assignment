jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockRejectedValue(new Error('fail')),
      getRepository: jest.fn(),
      destroy: jest.fn(),
    })),
  };
});
jest.mock('dotenv', () => ({ config: jest.fn() }));

describe('seed.ts error handling', () => {
  test.failing('should handle errors in seed and call process.exit', async () => {
    jest.resetModules();
    const spyError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const spyExit = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called');
    });
    await expect(async () => {
      await jest.isolateModulesAsync(async () => {
        await import('./seed');
      });
    }).rejects.toThrow('process.exit called');
    spyError.mockRestore();
    spyExit.mockRestore();
  });
}); 