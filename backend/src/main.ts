import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorLoggerFilter } from './common/error-logger.filter';
// If you haven't already, run: npm install @nestjs/swagger swagger-ui-express

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new (await import('@nestjs/common')).ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ErrorLoggerFilter());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('API documentation for Inventory Management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use('/openapi.json', (req: any, res: any) => res.json(document));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
