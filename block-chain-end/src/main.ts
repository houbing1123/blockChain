import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { CustomLogger } from './logger/custom-logger.service'; // ✅ 关键：必须显式导入类型
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true, // 确保启动阶段的日志也被捕获
  });

  app.use('/assets', express.static(join(process.cwd(), 'assets')));
  const customLogger = new CustomLogger(); // 创建 CustomLogger 实例
  app.useGlobalFilters(new GlobalExceptionFilter(customLogger)); // 注册全局过滤器
  await app.listen(process.env.PORT ?? 5170,"0.0.0.0");
  console.log(`应用运行在: ${await app.getUrl()}`);
}
bootstrap();
