import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefix = process.env.API_PREFIX || '/api/v1';
  app.setGlobalPrefix(prefix);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('AI-Powered Group Study Hub API')
    .setDescription('Enterprise SaaS REST & Realtime API Services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 API Server running on http://localhost:${port}${prefix}`);
  console.log(`📚 OpenAPI Docs available on http://localhost:${port}/docs`);
}

bootstrap();
