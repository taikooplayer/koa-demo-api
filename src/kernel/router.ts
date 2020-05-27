
import * as Router from '@koa/router';
import { RequestMapping } from './request-mapping';


const router = new Router();
export default (app) => {
  const requestMapping = new RequestMapping(router);
  requestMapping.scanController('api');
  app.use(router.routes(), router.allowedMethods());
}
