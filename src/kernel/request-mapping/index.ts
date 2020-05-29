
import { Context } from 'koa';
import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';
import { exploreController, RouteHandlerInterface } from './lib/loader';
import { ControllerRequestParamsInterface } from '../decorator/params.decorator';
import { ParamtypesEnum } from '../enum/paramtypes.enum';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Application } from '..';
// import { DataTypeEnum } from './enum/data-type.enum';

// 路由正则校准
export const URL_CORRECT_REG = /^(\s|\/)+|(\s|\/)+$/g;

export interface RouteMetadataInterface {
  filePath: string; // 文件路径
  prefix: string;// 路由前缀
  url: string;// 完整路由
  handler: RouteHandlerInterface; // 路由handler
}

export class RequestMapping {
  private readonly router;
  private readonly app;
  public _files: Set<string> = new Set();
  public _routes: Map<string, RouteMetadataInterface> = new Map();

  constructor (router, app: Application) {
    this.router = router;
    this.app = app;
  }

  remove (src: string, st: string) {
    const index = src.indexOf(st);
    if (index >= 0) {
      return src.substring(0, index);
    }
    return src;
  }

  /**
   * 读取路径下的文件
   * @param dir 路径
   */
  scanDir (dir: string) {
    const appDir = this.remove(__dirname, 'kernel');
    if (!path.isAbsolute(dir)) {
      dir = path.join(appDir, '/controller', dir);
    }
    
    if (!fs.existsSync(dir)) {
      throw new Error(`Can not find directory: ${dir}`);
    }

    const files = fs.readdirSync(dir);
    let result: string[] = [];
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        result = [...result, ...this.scanDir(filePath)];
      } else if (stat.isFile()) { // 是否为文件
        result.push(filePath);
      }
    });
    return result;
  }

  scanController (dir = '', prefix = '', middleware = []) {
    const files = this.scanDir(dir);
    files.forEach(file => {
      if (this._files.has(file)) return;
      this._files.add(file);
      let controller = require(file);
      // 兼容export default写法(支持module.exports)
      if (controller instanceof Function === false) {
        controller = controller.default;
      }
      const handlers: RouteHandlerInterface[] = exploreController(controller);
      handlers.forEach(handler => {
        let {
          funcName,
          httpMethod,
          urlPath,
          // dataType,
          params,
        } = handler;
        prefix = prefix.replace(URL_CORRECT_REG, '');
        urlPath = urlPath.replace(URL_CORRECT_REG, '');
        let url = `/${urlPath}`;
        if (prefix) {
          url = `/${prefix}${url}`
        }
        this.storeRouter(file, prefix, url, handler);
        this.router[httpMethod](url, ...middleware, async (ctx: Context) => {
          const data: any[] = await this.handleRouteParams(ctx, params);
          const instance = new controller(this.app);
          const result = await instance[funcName](...data);
          if (ctx.body === undefined) {
            ctx.body = this.handleDataType(result);
          }
        });
      });
    });
  }

  storeRouter (file: string, prefix: string, url: string, handler: RouteHandlerInterface) {
    const {
      httpMethod,
      urlPath,
    } = handler;
    const routeKey = `${httpMethod}:${urlPath}`;
    assert(!this._routes.has(routeKey), `[route] ${routeKey} already exists! this is file at : ${file}`);
    this._routes.set(routeKey, {
      filePath: file,
      prefix,
      url,
      handler,
    });
  }

  handleDataType (data: any) {
    return data;
  }

  async handleRouteParams (ctx: Context, params: object) {
    const data: any[] = [];
    for (const i in params) {
      const {
        key,
        parameterIndex,
        paramtype,
        dataType,
      }: ControllerRequestParamsInterface = params[i];
      let param: any;
      switch(paramtype) {
        case ParamtypesEnum.QUERY: 
          param = key ? ctx.request.query[key] : ctx.request.query;
          break;
        case ParamtypesEnum.BODY:
          param = key ? ctx.request.body[key] : ctx.request.body;
          break;
        case ParamtypesEnum.PARAM:
          param = key ? ctx.params[key]: ctx.params;
          break;
        case ParamtypesEnum.HEADERS:
          param = key ? ctx.request.headers[key] : ctx.request.headers;
          break;
        case ParamtypesEnum.REQUEST:
          param = ctx.request;
          break;
        case ParamtypesEnum.RESPONSE:
          param = ctx.response;
          break;
        default:
          break;
      }
      param = plainToClass(dataType, param);
      if (typeof param === 'object' ) {
        const errors = await validate(param);
        if (errors && errors.length > 0) {
          throw new Error();
        }
      }
      data[parameterIndex] = param;
    }
    return data;
  }
}
