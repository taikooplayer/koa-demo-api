

const middleware = async (ctx, next) => {
  console.log(3333, ctx);
  await next();
};

export default middleware;
