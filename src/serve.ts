import Koa from 'koa'
import Router from 'koa-router'
import Ffmepg from './Ffmepg'

const app = new Koa()
const router = new Router()

const ffmepg = new Ffmepg()
const p = 10086
router.get('/', (ctx) => {
  const { query } = ctx.request
  console.log(query.path)
  const ffstream = ffmepg.create(query.path as string)
  ctx.body = ffstream
})

// 注册路由
app.use(router.routes())
// 自动丰富 response 相应头，当未设置响应状态(status)的时候自动设置，在所有路由中间件最后设置(全局，推荐)，也可以设置具体某一个路由（局部），例如：router.get('/index', router.allowedMethods()); 这相当于当访问 /index 时才设置
app.use(router.allowedMethods())

export default function http() {
  app.listen(p, () => {
    console.log(`服务器启动成功port:${p}`)
  })
}
