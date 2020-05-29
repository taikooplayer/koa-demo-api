
import * as Router from '@koa/router';
import { RequestMapping } from './request-mapping';


const router = new Router();
export default (app) => {
  const requestMapping = new RequestMapping(router, app);
  // 加载控制器里所有的控制器
  requestMapping.scanController();
  app.use(router.routes(), router.allowedMethods());
}
