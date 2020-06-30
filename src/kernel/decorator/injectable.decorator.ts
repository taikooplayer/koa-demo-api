import { INJECTABLE_METADATA } from '../constant';



export const Injectable = (params: any = ''): ClassDecorator => {
  return (target) => {
    // console.log(33333, params, target.prototype);
    // Reflect.defineMetadata(INJECTABLE_METADATA, target);
  };
};