import { INJECTABLE_METADATA } from '../constant';
import { ReflectDefaultMetadata } from '../enum/reflect-default-metadata.enum';

const _partialContainer = new Map<string, any>();

export const Injectable = (): ClassDecorator => {
  return (target) => {
    const params: Array<any> = Reflect.getMetadata(ReflectDefaultMetadata.DESGIN_PARAMTYPES, target);
    // console.log(33333, target.prototype);
    // Reflect.defineMetadata(INJECTABLE_METADATA, target.name, target);
    // _partialContainer.set(target.name, target);
    // console.log(111111, _partialContainer);
  };
};