import * as KoaApplication from 'koa';
import * as BaseTypeorm from 'typeorm'

export interface TypeormConfig {
  datasources: BaseTypeorm.ConnectionOptions[];
};

/****************** koa-config ******************/
export interface CoreConfig {
  port?: number;
  middleware?: Array<string>;
  typeorm?: TypeormConfig;
}

export class Application extends KoaApplication {
  config: CoreConfig;
}
