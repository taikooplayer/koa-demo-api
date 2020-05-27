import KoaApplication = require('koa');

/****************** koa-config ******************/
interface ConfigInterface {
  [key: string]: any;
  middleware: [];
}

export class Application extends KoaApplication {
  config: ConfigInterface;
}
