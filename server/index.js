const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const logger = require('koa-logger') //l1 zad2
const favicon = require('koa-favicon') // l1 zad3
//const favicon = require('koa-icon') //l1 zad3

require('./store').init()
const app = new Koa()
const port = process.env.PORT || 3000

app.use(favicon(__dirname + '/favicon.ico'))//l1 zad 3
//app.use(favicon('/resized/check.ico'))//l1 zad3

app.use(logger()) //l1 zad2

app.use(serve(path.resolve(__dirname, '..', 'client')))

const userRoutes = require('./routes/users')
app.use(userRoutes.routes())

const taskRoutes = require('./routes/tasks')
app.use(taskRoutes.routes())

app.listen(port)

console.log('App is listening at http://127.0.0.1:3000')
