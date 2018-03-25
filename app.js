// 加载 express 模块
const express = require('express')
// 加载 解析表单请求体的第三方包 body-parser
var bodyParser = require('body-parser')
// 加载 router 文件模块
const router = require('./router')
// *************************************************
// 实例化 web服务器
const app = express()
// *************************************************
// 配置 body-parser
// 只要加入这个配置，则在 req 请求对象上会多出来一个属性：body
// 也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据了
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// *************************************************
// 开放页面所需要的静态资源
app.use('/public',express.static('./public'))
app.use('/node_modules', express.static('./node_modules'))
// *************************************************
// // express-art-template 读取（解析）、渲染、替换
// express-arttemplate 内部依赖了art-template 
// 只要经过该配置，那么你就可以使用 res.render 方法 读取、渲染、发送 一次性处理文件了
app.engine('html', require('express-art-template'))
// *************************************************
app.use(router)
// *************************************************
// 绑定端口号，启动服务器，
app.listen(3000, () => {
    console.log('running 3000...')
})