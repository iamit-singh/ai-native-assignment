import { ProductModule } from './product.module';

describe('ProductModule', () => {
  it('should be defined', () => {
    expect(new ProductModule()).toBeInstanceOf(ProductModule);
  });
}); 