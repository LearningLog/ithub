// 加载 express 模块
const express = require('express')
// 加载 解析表单请求体的第三方包 body-parser
var bodyParser = require('body-parser')
// 加载 session 模块
const session = require('express-session')
// 加载持久化存储 session 模块
const MySQLStore = require('express-mysql-session')(session);
// 加载 router 文件模块
const router = require('./router')
// *************************************************
// 实例化 web服务器
const app = express()
// *************************************************
// 配置 session
// 只要配置了该插件，则在后续请求的任何处理函数中都可以使用 req.session 来访问或者设置 Session 数据了
// req.session 就是一个对象，所以：
//    读取 Session 数据：req.session.xxx
//    保存 Session 数据：req.session.xxx = xxx
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ithub'
};

var sessionStore = new MySQLStore(options);
app.use(session({
    key: 'session_cookie_name',// 加密规则私钥，用来保证不同的丰巢快递柜的密码规则都是不一样的，
    secret: 'keyboard cat',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,// 是否在初始化的时候就给客户端发送一个 Cookie
    store: sessionStore // 将 Session 数据存储到数据库中（默认是内存存储）
}));
// ***********************************************
// 配置 body-parser
// 只要加入这个配置，则在 req 请求对象上会多出来一个属性：body
// 也就是说你就可以直接通过 req.body 来获取表单 POST 请求体数据了
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
// *************************************************
// 开放页面所需要的静态资源
app.use('/public', express.static('./public'))
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