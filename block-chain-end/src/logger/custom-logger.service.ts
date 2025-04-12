// src/logger/custom-logger.service.ts
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST }) // 请求作用域
export class CustomLogger extends ConsoleLogger {
  private readonly logDir = path.join(process.cwd(), 'logs');
  private readonly errorLogPath = path.join(this.logDir, 'error.log');

  constructor() {
    super();
    this.ensureLogsDirExists();
  }

  private ensureLogsDirExists() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  // 新增 error 方法，接收请求对象
  error(message: string, trace?: string, context?: string, request?: Request) {
    const fullPath = request ? `${request.method} ${request.path}` : 'N/A';
    const logMessage = `${fullPath} - ${message}`; // 合并请求路径和消息
    super.error(logMessage, trace, context); // 调用父类方法
    this.writeToFile(logMessage, trace, context, fullPath);
  }

  private writeToFile(
    message: string,
    trace?: string,
    context?: string,
    fullPath?: string,
  ) {
    const logEntry = `${new Date().toISOString()} [ERROR] ${context ?? ''} [${fullPath ?? '-'}]: ${message}${trace ?? ''}`;
    fs.appendFileSync(this.errorLogPath, logEntry);
  }
}