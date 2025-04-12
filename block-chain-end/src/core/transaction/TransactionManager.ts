import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(private readonly entityManager: EntityManager) {}

  // 统一的事务执行方法
  async executeTransaction<T>(callback: (manager: EntityManager) => Promise<T>): Promise<T> {
    const queryRunner = this.entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const result = await callback(queryRunner.manager);  // 传递 EntityManager 进行操作
      await queryRunner.commitTransaction();  // 提交事务
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();  // 回滚事务
      throw error;
    } finally {
      await queryRunner.release();  // 释放连接
    }
  }
}