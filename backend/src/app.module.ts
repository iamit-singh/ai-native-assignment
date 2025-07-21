import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Sku } from './entities/sku.entity';
import { CategoryModule } from './category.module';
import { ProductModule } from './product.module';
import { SkuModule } from './sku.module';
import { RbacMiddleware } from './common/rbac.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'inventory',
      autoLoadEntities: true,
      synchronize: true, // For dev only; use migrations in prod
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([Category, Product, Sku]),
    CategoryModule,
    ProductModule,
    SkuModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RbacMiddleware).forRoutes('*');
  }
}
