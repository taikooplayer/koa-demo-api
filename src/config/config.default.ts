export type ConfigInterface = {
  [key: string]: any
}

export default () => {
  const config: ConfigInterface = {};
  config.port = 3000;
  config.middleware = ['errorHandler'];

  return config;
}

