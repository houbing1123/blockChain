import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5170);
  console.log(`应用运行在: ${await app.getUrl()}`);
}
bootstrap();
