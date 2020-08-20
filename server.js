const koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');
 
const app = new koa();
app.use(serve(__dirname + '/'));
app.use(async (ctx) => {
  if(ctx.status === 404) await send(ctx, 'index.html', { root: __dirname + '/' });
});
 
const port = 3333;
const server = app.listen(port);
console.log('server start port:' + port);