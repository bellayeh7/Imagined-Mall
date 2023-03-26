const router = require('koa-router')()
// const db = require('../db/index')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = {
    data: {
      string: 'koa2 string'
    },
    code: 200,
    msg: 'success'
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/findMember', async function (ctx, next) {
  const res = await findMember({openid: 1})
  ctx.body = res
})

module.exports = router
