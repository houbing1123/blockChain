import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/assets', express.static(join(process.cwd(), 'assets')));
  await app.listen(process.env.PORT ?? 5170);
  console.log(`应用运行在: ${await app.getUrl()}`);
}
bootstrap();
