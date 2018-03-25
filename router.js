// 0.加载 express
const express = require('express')

const index = require('./controllers/index')
const use = require('./controllers/use')
const topic = require('./controllers/topic')
// 1.调用 express.Router() 实例化一个router 路由

const router = express.Router()

// 2. 为路由 router 添加申请处理

// index.js
router.get('/', index.showIndex)

// user.js
router
    .get('/signin', use.showSignin)
    .post('/signin', use.signin)
    .get('/signup', use.showSignup)
    .post('/signup', use.signup)
    .post('/signout', use.signout)
    

// topic.js
router
    .get('/topic/create', topic.showCreate)
    .post('/topic/create', topic.create)
    .get('/topic/:topicID', topic.showTopic)
    .get('/topic/:topicID/edit', topic.showEdit)
    .post('/topic/:topicID/edit', topic.edit)
    .post('/topic/:topicID/delete', topic.delete)

// 3. 导出 路由 router
module.exports = router

// 4. 在 app.js 中：app.use(路由名称)