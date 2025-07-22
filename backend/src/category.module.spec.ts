import { CategoryModule } from './category.module';

describe('CategoryModule', () => {
  it('should be defined', () => {
    expect(new CategoryModule()).toBeInstanceOf(CategoryModule);
  });
}); 