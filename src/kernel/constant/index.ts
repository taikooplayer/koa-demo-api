
// 控制器里的请求方式
export const CONTROLLER_METHOD_METADATA = Symbol('Controller#Method');
// 控制器里的调用函数
export const CONTROLLER_FUNC_METADATA = Symbol('Controller#Func');
// 控制器里的路由
export const CONTROLLER_ROUTE_METADATA = Symbol('Controller#Route');
// 控制器路由前缀
export const CONTROLLER_PRIFIX_METADATA = Symbol('Controller#Prefix');
// 控制器函数返回的数据格式
export const CONTROLLER_RETURN_TYPE_METADATA = Symbol('Controller#ReturnType');
// 控制器里路由方法的请求参数
export const CONTROLLER_REQUEST_PARAMS_METADATA = Symbol('Controller#RequestParams');
// 注入容器
export const INJECTABLE_METADATA = Symbol('Injectable');
// service实例map
export const SERVICE_METADATA = Symbol('Service');
