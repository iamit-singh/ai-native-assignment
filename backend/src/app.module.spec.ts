import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  it('should be defined', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const appModule = moduleRef.get(AppModule);
    expect(appModule).toBeInstanceOf(AppModule);
  });

  it('should call configure', () => {
    const appModule = new AppModule();
    const consumer = { apply: jest.fn().mockReturnThis(), forRoutes: jest.fn() };
    appModule.configure(consumer as any);
    expect(consumer.apply).toHaveBeenCalled();
    expect(consumer.forRoutes).toHaveBeenCalledWith('*');
  });
}); 