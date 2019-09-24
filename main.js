const Koa = require('koa');
const views = require('koa-views');
const serve = require('koa-static');
const path = require('path');
const history = require('connect-history-api-fallback');
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const devMiddleware = require("./devMiddleware");
const router = require('./src/router')
// const hotMiddleware = require('./hotMiddleware');

const app = new Koa();


app.use(async (ctx,next) => {
  try{
      await next()
  }catch(err){
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
          message: err.message
      };
  }
});

app.use(views(__dirname + '/views', { // 对项目根目录下views模板解析  注意不是./views
  map: {
    html: 'pug'
  }
}));

app.use(router.routes()).use(router.allowedMethods())
const historyConfig = {
  index: './main.html'
};
app.use(async function middleware(ctx, next){
  history(historyConfig)(ctx.req, ctx.res, next);
});
const compiler = webpack(webpackConfig);
app.use(devMiddleware(compiler));
// app.use(hotMiddleware(compiler));

app.use(serve(__dirname + "/dist/", {extensions: ['html']}));

// app.use( async ( ctx ) => {
//   // ctx.body = '<h1>找不到页面</h1>'
//   let name = '找不到页面'
//   await ctx.render('404', {
//     name,
//   })
// })
app.listen(3012, () => {
    console.log('app listen at 3012')
});