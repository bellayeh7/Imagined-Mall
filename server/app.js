const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
require('./db/index')// 连接数据库



// const eventTag = require('./routes/eventTag')
const member = require('./routes/member')
const commodity = require('./routes/commodity')
const order = require('./routes/order')
const chat = require('./routes/chat')


// error handler
onerror(app)

// middlewares 注意bodyparser不支持form-data
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(eventTag.routes(), eventTag.allowedMethods())
app.use(member.routes(), member.allowedMethods())
app.use(commodity.routes(), commodity.allowedMethods())
app.use(order.routes(), order.allowedMethods())
app.use(chat.routes(), chat.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});



module.exports = app
