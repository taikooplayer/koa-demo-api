import { Context } from 'koa';

export default () => {
  return async (ctx: Context, next: Function) => {
    console.log(1111, ctx.method);
    await next();
  };
};
