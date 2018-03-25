// 加载 express 模块
const express = require('express')
// 加载 router 文件模块
const router = require('./router')
// 实例化 web服务器
const app = express()

// 开放页面所需要的静态资源
app.use('/public',express.static('./public'))
app.use('/node_modules', express.static('./node_modules'))

// // express-art-template 读取（解析）、渲染、替换
// express-arttemplate 内部依赖了art-template 
// 只要经过该配置，那么你就可以使用 res.render 方法 读取、渲染、发送 一次性处理文件了
app.engine('html', require('express-art-template'))
app.use(router)

// 绑定端口号，启动服务器，
app.listen(3000, () => {
    console.log('running 3000...')
})