import * as KoaApplication from 'koa';

/****************** koa-config ******************/
interface ConfigInterface {
  [key: string]: any;
  port: number;
  middleware: [];
}

export class Application extends KoaApplication {
  config: ConfigInterface;
}
