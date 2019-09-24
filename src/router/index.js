const Router = require('koa-router')
const router1 = require('./router1');
const router2 = require('./router2');
const router = new Router()

// router.get('/', async (ctx, next) => {
//   debugger
//   ctx.render('aa',{name: 'aa'});
// })
router.use('/test', router1);
router.use('/page', router2);

module.exports = router
