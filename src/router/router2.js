const Router = require('koa-router');
const path = require('path');
const router = new Router()
const pug = require('pug');

router.get('/404', async ( ctx )=>{
  ctx.body = pug.renderFile(path.resolve(__dirname,'../../src/views/404.pug'), {
    name: '404 page!'
  });
});
router.get('/helloworld', async ( ctx )=>{
  // const compiledFunction = pug.compileFile(path.resolve(__dirname,'../../src/views/index.pug'));
  // let rst = compiledFunction({
  //   name: '李莉'
  // })
  ctx.body = pug.renderFile(path.resolve(__dirname,'../../src/views/index.pug'), {
    name: '李莉2'
  });
})

module.exports = router.routes()
