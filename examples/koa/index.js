require('bare-node-runtime/global')

const Koa = require('koa', {
  with: { imports: 'bare-node-runtime/imports' }
})

const app = new Koa()

app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(3000)
