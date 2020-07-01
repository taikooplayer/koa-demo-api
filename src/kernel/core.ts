import { Application } from '.';
import { initTypeorm } from './model';

export function init(app: Application) {
  if (app.config.typeorm) {
    // 初始化typeorm
    initTypeorm(app);
  }
}

