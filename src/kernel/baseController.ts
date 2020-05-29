import { Application } from '.';


export default class BaseController {
  public readonly app;
  public readonly config;

  constructor(app: Application) {
    this.app = app;
    this.config = app.config;
  }
}
