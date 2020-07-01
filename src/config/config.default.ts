// export type ConfigInterface = {
//   [key: string]: any
// }

import { CoreConfig } from '../kernel';

export default () => {
  const config: CoreConfig = {};
  
  config.port = 3000;
  config.middleware = ['errorHandler'];

  return config;
}

