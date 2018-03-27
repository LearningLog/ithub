
const md5 = require('md5')
const moment = require('moment')
const User = require('../modules/user')
// connection.connect();

exports.showSignin = (req, res) => {
    res.render('../views/signin.html')
}

exports.signin = (req, res) => {
    // 1.接收数据
    const body = req.body
    // 2.数据校验
    // 2.1 基本数据校验
    // 2.2 业务数据校验
    User.getByEmail(body.email, (err, user) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        if (!user.email) {
            return res.send({
                code: 1,
                message: '邮箱不存在'
            })
        }
        if (!user.password) {
            return res.send({
                code: 2,
                message: '密码错误'
            })
        }
        // 3. 注册 session ，保持用户登录页面
        req.session.user = user
        // console.log(req.session.user)
        // 4.响应
        res.send({
            code: 200,
            message: '登陆成功'
        })
    })
}

exports.showSignup = (req, res) => {
    res.render('signup.html')
}


exports.signup = (req, res) => {
    // 1. 接收数据
    // 通过 req.body 来获取表单 POST 请求体数据了
    const body = req.body
    // 2. 验证数据，处理数据
    // 2.1 普通数据校验
    // 2.1.1 数据是否为空，格式是否正确
    // 2.2 业务数据校验
    // 2.2.1 校验邮箱是否被占、校验昵称是否被占

    User.getByEmail(
        body.email,
        (err, user) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message // 把错误对象中的错误消息发送给客户端
                })
            }
            if (user) {
                return res.send({
                    code: 1,
                    message: '邮箱已被占用了'
                })
            }
            User.getByNickname(body.nickname, (err, user) => {
                if (err) {
                    return res.send({
                        code: 500,
                        message: err.message
                    })
                }
                if (user) {
                    return res.send({
                        code: 2,
                        message: '该昵称已被占用'
                    })
                }
                body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
                body.password = md5(body.password)
                User.createUser(body, (err, user) => {
                    if (err) {
                        return res.send({
                            code: 500,
                            message: err.message
                        })
                    }
                    // 3. 响应数据
                    res.send({
                        code: 200,
                        message: 'ok'
                    })
                })
            })
        }
    );
}

exports.signout = (req, res) => {
    // 1. 清除登录状态
    delete req.session.user
    // 2. 页面重定向
    res.redirect('/signin')
}