import * as path from 'path';
import { CoreConfig } from '.';

export default (app) => {
  app.config = loadConfig();
  
}

function loadConfig () {
  const env = process.env.NODE_ENV || 'dev';
  const configPath = path.join(__dirname, '../config');
  const defaultConfig: CoreConfig = require(`${configPath}/config.default`).default();
  const envConfig: CoreConfig = require(`${configPath}/config.${env}`).default();
  const config: CoreConfig = Object.assign({}, defaultConfig, envConfig);
  return config;
}
