

export const Autowired = (params: any = ''): PropertyDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    // 获取修饰器修饰的值,理论上 typeof === function,需要new
    const typeClass = Reflect.getMetadata("design:type", target, propertyKey);
    const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {
      writable: true,
      enumerable: true,
      configurable: true
    };
    descriptor.value = params ? new typeClass(params) : new typeClass();
    // 将修饰器定义到目标类上
    Reflect.defineProperty(target, propertyKey, descriptor);
  };
};
