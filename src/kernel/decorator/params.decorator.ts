import { ParamtypesEnum } from '../enum/paramtypes.enum';
import { CONTROLLER_REQUEST_PARAMS_METADATA } from '../constant';
import { ReflectDefaultMetadata } from '../enum/reflect-default-metadata.enum';

export interface ControllerRequestParamsInterface {
  parameterIndex: number, // 参数位置
  key: string, // 参数字典的key
  paramtype: string, // 请求方式
  dataType: any, // 参数类型(String, Array, Object等)
};

const createParamDecorator = (paramtype) => {
  // parameterIndex代表参数在第几位(从0开始),即funcName(param),参数param的位置为0
  return (key?: string): ParameterDecorator => (target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
    // 参数类型(String, Array, Object等)
    const type = Reflect.getMetadata(ReflectDefaultMetadata.DESGIN_PARAMTYPES, target, propertyKey);
    const dataType = type[parameterIndex];
    const params: Array<string> = Reflect.getMetadata(CONTROLLER_REQUEST_PARAMS_METADATA, target, propertyKey) || {};
    Reflect.defineMetadata(CONTROLLER_REQUEST_PARAMS_METADATA, Object.assign({
      [`${paramtype}:${parameterIndex}`]: {
        parameterIndex,
        key,
        paramtype,
        dataType,
      }
    }, params), target, propertyKey);
  };
};

export const Context = createParamDecorator(ParamtypesEnum.CONTEXT);
export const Query = createParamDecorator(ParamtypesEnum.QUERY);
export const Body = createParamDecorator(ParamtypesEnum.BODY);
export const Params = createParamDecorator(ParamtypesEnum.PARAMS);
export const Request = createParamDecorator(ParamtypesEnum.REQUEST);
export const Response = createParamDecorator(ParamtypesEnum.RESPONSE);
export const Headers = createParamDecorator(ParamtypesEnum.HEADERS);
export const Cookies = createParamDecorator(ParamtypesEnum.COOKIES);
