import { Application, CoreConfig } from '.';
import { Context } from 'koa';

interface controllerOption {
  app: Application,
  ctx: Context
};

export default class BaseController {
  public readonly app: Application;
  public readonly config: CoreConfig;
  public readonly ctx: Context;

  constructor(options: controllerOption) {
    this.app = options.app;
    this.config = this.app.config;
    this.ctx = options.ctx;
  }
}
