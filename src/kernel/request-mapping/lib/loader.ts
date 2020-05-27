import { 
  CONTROLLER_PRIFIX_METADATA,
  CONTROLLER_FUNC_METADATA,
  CONTROLLER_METHOD_METADATA,
  CONTROLLER_ROUTE_METADATA,
  CONTROLLER_RETURN_TYPE_METADATA,
  CONTROLLER_REQUEST_PARAMS_METADATA,
} from '../../../kernel/constant';
import { HttpMethodEnum } from '../../../kernel/enum/http-method.enum';
import { DataTypeEnum } from '../../../kernel/enum/data-type.enum';
import { URL_CORRECT_REG } from '..';
// import { ReflectDefaultMetadata } from '../enum/reflect-default-metadata.enum';

export interface RouteHandlerInterface {
  funcName: string; // 控制器方法名
  httpMethod: HttpMethodEnum; // 控制器请求类型
  urlPath: string; // 路由地址
  dataType: DataTypeEnum; // 数据类型
  params: object; // 方法参数信息
}

export function exploreController (controller: any) {
  const handlers: RouteHandlerInterface[] = [];
  const prototype = controller.prototype;
  // 类的装饰里传的值
  let controllorPrefix: string = Reflect.getMetadata(CONTROLLER_PRIFIX_METADATA, controller);
  if (!controllorPrefix) {
    return handlers;
  }
  // 控制器里的方法名称数组
  const funcNames: string[] = Reflect.getMetadata(CONTROLLER_FUNC_METADATA, prototype);
  if (!funcNames) {
    return handlers;
  }
  funcNames.forEach(funcName => {
    // 该方法的请求方式
    const httpMethod: HttpMethodEnum = Reflect.getMetadata(CONTROLLER_METHOD_METADATA, prototype, funcName);
    // 该方法的路由
    let route: string = Reflect.getMetadata(CONTROLLER_ROUTE_METADATA, prototype, funcName);
    // 获取控制器方法里的入参信息
    const params: object = Reflect.getMetadata(CONTROLLER_REQUEST_PARAMS_METADATA, prototype, funcName);
    // 该方法返回的数据格式(默认返回JSON)
    const dataType: DataTypeEnum = Reflect.getMetadata(CONTROLLER_RETURN_TYPE_METADATA, prototype, funcName) || DataTypeEnum.JSON;
    // 控制器下的路由(路由前缀+函数方法定义的路由)
    controllorPrefix = controllorPrefix.replace(URL_CORRECT_REG, '');
    route = route.replace(URL_CORRECT_REG, '');
    const urlPath = `/${controllorPrefix}/${route}`;
    handlers.push({
      funcName,
      httpMethod,
      urlPath,
      dataType,
      params,
    });
  });
  return handlers;
}
