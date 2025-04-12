// src/filters/global-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { CustomLogger } from '../logger/custom-logger.service';
import { Request } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(CustomLogger) private readonly logger: CustomLogger, // 注入 CustomLogger
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>(); // 获取 Express 请求对象
    const response = ctx.getResponse();

    // 记录错误日志（自动附加请求路径）
    this.logger.error(
      `全局捕获异常: ${exception instanceof Error ? exception.message : '未知错误'}`,
      exception instanceof Error ? exception.stack : '',
      'GlobalFilter',
      request // 传递请求对象
    );

    response.status(500).json({
      statusCode: 500,
      message: '服务器内部错误',
    });
  }
}