// src/core/decorators/ensure-persisted.decorator.ts
import { Repository } from 'typeorm';

export function Transaction() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      
      // 自动验证保存结果
      if (result instanceof Repository) {
        const entity = await result.findOne(args[0].id);
        if (!entity) throw new Error('数据未持久化');
        return entity;
      }
      
      return result;
    };
  };
}