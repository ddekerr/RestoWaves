import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(PORT, () => console.log(`Server starts on ${PORT} port`));
}
start();
