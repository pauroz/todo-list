const Router = require('@koa/router')

const router = new Router({ prefix: '/api/tasks' })

// router.get('/', async (ctx) => {
//   ctx.status = 501
// })

router.get('/', async (ctx) => {
  ctx.response.body = await store.listTasks()
})

//router.post('/', async (ctx) => {
//  ctx.status = 501
//})

router.post('/', async (ctx) => {
  await store.addTask(ctx.request.body)
  ctx.status = 200
})

router.delete('/', async (ctx) => {
  ctx.status = 501
})

const store = require('../store')

module.exports = router