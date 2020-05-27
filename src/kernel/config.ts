import * as path from 'path';

export default (app) => {
  app.config = loadConfig();
  
}

function loadConfig () {
  const env = process.env.NODE_ENV || 'dev';
  const configPath = path.join(__dirname, '../config');
  const defaultConfig = require(`${configPath}/config.default.ts`).default();
  const envConfig = require(`${configPath}/config.${env}.ts`).default();
  const config = Object.assign({}, defaultConfig, envConfig);
  return config;
}
