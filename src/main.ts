import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
    bodyParser: true,
  });

  app.enableCors({
    origin: ['http://localhost:3000', process.env.CORS_ORIGIN],
    credentials: true,
  });

  await app.listen(3333);
}
bootstrap();
