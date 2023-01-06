import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  await app.listen(configService.get('PORT'));
  // await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
