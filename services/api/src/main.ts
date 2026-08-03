import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prefix = process.env.API_PREFIX || '/api/v1';
  app.setGlobalPrefix(prefix);

  app.enableCors({ origin: true, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('AI-Powered Group Study Hub REST API Service')
    .setDescription('Domain-Driven REST API Gateway Services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 REST API Service running on http://localhost:${port}${prefix}`);
}

bootstrap();
