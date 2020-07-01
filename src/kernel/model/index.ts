// import { Application } from '..';
import { Application } from '..';

import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export function initTypeorm(app: Application) {
  Model.init(app);
}

export class Model {
  // 实例map
  private static map = new Map<string, Connection>();
  // private static app: Application;
  // private static config = new Map<string, ConnectionOptions>();
  
  public static async init (app: Application): Promise<void> {
    // this.app = app;
    const config = app.config.typeorm;
    if (config?.datasources) {
      const datasources = config?.datasources;
      for (const i of datasources) {
        if (!i.name) {
          throw new Error('typeorm name is required!');
        }
        const instance = await createConnection(i);
        this.map.set(i.name, instance);
      }
    }
  }

  public static getInstance(name: string): Connection {
    let instance;
    if (this.map.has(name)) {
      instance = this.map.get(name);
      if (instance) {
        return instance;
      }
    }
    throw new Error(`typeorm instance is not exsit: ${name}`);
  }

  public async get(name: string) {
    // return this.
  }

}