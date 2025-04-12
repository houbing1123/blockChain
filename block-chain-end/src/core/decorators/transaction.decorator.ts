import { EntityManager } from 'typeorm';

export function Transaction() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const manager = args[args.length - 1] as EntityManager;
      if (!manager) {
        throw new Error('EntityManager is not provided');
      }
      // Begin transaction, pass to the original method
      return await originalMethod.apply(this, args);
    };
  };
}