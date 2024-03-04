import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

config();

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [configService.getOrThrow('REACT_APP_URI'), configService.getOrThrow('REACT_APP_PRODUCTION_URI')],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
