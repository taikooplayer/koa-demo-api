import { objectKeySort } from '../utils';


export const Autowired = (params: any = ''): PropertyDecorator => {

  return (target: Object, propertyKey: string | symbol) => {
    let paramsKey = '';
    if (params instanceof Object) {
      params = objectKeySort(params);
      paramsKey = JSON.stringify(params);
    } else {
      paramsKey = params;
    }
    
    // 获取修饰器修饰的值,理论上 typeof === function,需要new
    const typeClass = Reflect.getMetadata("design:type", target, propertyKey);
    let service = Reflect.getMetadata(paramsKey, typeClass);
    if (!service) {
      service = params ? new typeClass(params) : new typeClass();
      Reflect.defineMetadata(paramsKey, service, typeClass);
    }
    const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {
      writable: true,
      enumerable: true,
      configurable: true
    };
    descriptor.value = service;
    // 将修饰器定义到目标类上
    Reflect.defineProperty(target, propertyKey, descriptor);
  };
};
