import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
    cors: true,
    bodyParser: true,
  });

  await app.listen(3000);
}
bootstrap();