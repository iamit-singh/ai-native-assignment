jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      setGlobalPrefix: jest.fn(),
      enableCors: jest.fn(),
      useGlobalPipes: jest.fn(),
      useGlobalFilters: jest.fn(),
      listen: jest.fn(),
      use: jest.fn(),
    }),
  },
}));
jest.mock('@nestjs/swagger', () => ({
  SwaggerModule: {
    createDocument: jest.fn().mockReturnValue({}),
    setup: jest.fn(),
  },
  DocumentBuilder: jest.fn().mockImplementation(() => ({
    setTitle: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis(),
    setVersion: jest.fn().mockReturnThis(),
    addBearerAuth: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue({}),
  })),
  ApiProperty: () => () => {},
  ApiOperation: () => () => {},
  ApiBody: () => () => {},
  ApiResponse: () => () => {},
  ApiParam: () => () => {},
  ApiTags: () => () => {},
  ApiExtraModels: () => () => {},
}));
jest.mock('./common/error-logger.filter', () => ({ ErrorLoggerFilter: jest.fn() }));

describe('main.ts', () => {
  it('should call bootstrap without error', async () => {
    const main = await import('./main');
    await expect(main).resolves;
  });
}); 