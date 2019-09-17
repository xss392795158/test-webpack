const Koa = require('koa');
const webpack = require('webpack');

const app = new Koa();
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3012);
/**
 * 等价于
   const http = require('http');
   const Koa = require('koa');
   const app = new Koa();
   http.createServer(app.callback()).listen(3012);
 */
