export type ConfigInterface = {
  [key: string]: any
}

export default () => {
  const config: ConfigInterface = {};
  config.middleware = ['errorHandler'];

  return config;
}

