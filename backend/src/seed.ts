import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Sku } from './entities/sku.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'inventory',
  entities: [Category, Product, Sku],
  synchronize: true,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  await AppDataSource.initialize();
  const categoryRepo = AppDataSource.getRepository(Category);
  const productRepo = AppDataSource.getRepository(Product);
  const skuRepo = AppDataSource.getRepository(Sku);

  // Seed categories
  const categories = [
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Clothing' },
  ];
  for (const cat of categories) {
    let category = await categoryRepo.findOne({ where: { name: cat.name } });
    if (!category) {
      category = categoryRepo.create(cat);
      await categoryRepo.save(category);
      console.log(`Created category: ${cat.name}`);
    }
  }

  // Seed products
  const electronics = await categoryRepo.findOne({
    where: { name: 'Electronics' },
  });
  const books = await categoryRepo.findOne({ where: { name: 'Books' } });
  const clothing = await categoryRepo.findOne({ where: { name: 'Clothing' } });

  const products = [
    { name: 'Smartphone', description: 'Latest model', category: electronics },
    { name: 'Laptop', description: 'High performance', category: electronics },
    { name: 'Novel', description: 'Bestselling book', category: books },
    { name: 'T-Shirt', description: '100% cotton', category: clothing },
  ];
  for (const prod of products) {
    if (!prod.category) {
      console.warn(`Skipping product ${prod.name}: category not found.`);
      continue;
    }
    let product = await productRepo.findOne({ where: { name: prod.name } });
    if (!product) {
      product = productRepo.create({
        name: prod.name,
        description: prod.description,
        categoryId: prod.category.id,
      });
      await productRepo.save(product);
      console.log(`Created product: ${prod.name}`);
    }
  }

  // Seed SKUs
  const smartphone = await productRepo.findOne({
    where: { name: 'Smartphone' },
  });
  const laptop = await productRepo.findOne({ where: { name: 'Laptop' } });
  const novel = await productRepo.findOne({ where: { name: 'Novel' } });
  const tshirt = await productRepo.findOne({ where: { name: 'T-Shirt' } });

  const skus = [
    { code: 'SM-001', price: 699.99, stock: 50, product: smartphone },
    { code: 'LP-001', price: 1299.99, stock: 30, product: laptop },
    { code: 'BK-001', price: 19.99, stock: 100, product: novel },
    { code: 'TS-001', price: 9.99, stock: 200, product: tshirt },
  ];
  for (const skuData of skus) {
    if (!skuData.product) {
      console.warn(`Skipping SKU ${skuData.code}: product not found.`);
      continue;
    }
    let sku = await skuRepo.findOne({ where: { code: skuData.code } });
    if (!sku) {
      sku = skuRepo.create({
        code: skuData.code,
        price: skuData.price,
        stock: skuData.stock,
        productId: skuData.product.id,
      });
      await skuRepo.save(sku);
      console.log(`Created SKU: ${skuData.code}`);
    }
  }

  await AppDataSource.destroy();
  console.log('Seeding completed.');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
