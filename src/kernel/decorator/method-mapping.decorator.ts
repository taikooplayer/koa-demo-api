import { HttpMethodEnum } from '../enum/http-method.enum';
import {
  CONTROLLER_METHOD_METADATA,
  CONTROLLER_ROUTE_METADATA,
  CONTROLLER_FUNC_METADATA,
  CONTROLLER_PRIFIX_METADATA
} from '../constant';


const createHttpMethodDecorator = (method: string) => (path = ''): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    const funcs = Reflect.getMetadata(CONTROLLER_FUNC_METADATA, target) || [];
    funcs.push(propertyKey);
    // 设置调用控制器里的函数
    Reflect.defineMetadata(CONTROLLER_FUNC_METADATA, funcs, target);
    // 设置调用控制器里的方法(get,post,put...)
    Reflect.defineMetadata(CONTROLLER_METHOD_METADATA, method, target, propertyKey);
    // 设置控制器里的路由地址
    Reflect.defineMetadata(CONTROLLER_ROUTE_METADATA, path, target, propertyKey);
  };
};

export function Control (prefix = ''): ClassDecorator {
  const strArr: string[] = [];
  if (prefix.length > 0) {
    const arr = prefix.split('/');
    arr.forEach(element => {
      if (element === '') return;
      strArr.push(element);
    });
  }
  return target => {
    Reflect.defineMetadata(CONTROLLER_PRIFIX_METADATA, `/${strArr.join('/')}`, target);
  };
}

export const Get = createHttpMethodDecorator(HttpMethodEnum.GET);
export const Post = createHttpMethodDecorator(HttpMethodEnum.POST);
export const Put = createHttpMethodDecorator(HttpMethodEnum.PUT);
export const Delete = createHttpMethodDecorator(HttpMethodEnum.DELETE);
export const Options = createHttpMethodDecorator(HttpMethodEnum.OPTIONS);

