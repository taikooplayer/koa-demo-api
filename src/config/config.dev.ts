import { CoreConfig } from '../kernel';
import * as path from 'path';

export default () => {

  const config: CoreConfig = {};

  config.typeorm = {
    datasources: [
      {
        name: 'admin',
        type: 'mysql',
        host: 'localhost',
        // port: 3306,
        username: 'root',
        password: '',
        database: 'v_admin',
        entities: [ path.resolve(__dirname, `../entities/*.ts`) ],
        logging: true
      }
    ]
  }

  return config;
}