var mysql = require('mysql');
const moment = require('moment')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ithub'
});
// connection.connect();

exports.showSignin = (req, res) => {
    res.render('signin.html')
}

exports.signin = (req, res) => {
    res.send('signin')
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

    connection.query(
        'SELECT * FROM `users` WHERE `email`=?', [body.email],
        (err, results) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message // 把错误对象中的错误消息发送给客户端
                })
            }
            if (results[0]) {
                return res.send({
                    code: 1,
                    message: '邮箱已被占用了'
                })
            }
            connection.query('select * from `users` where `nickname`=?', [body.nickname], (err, results) => {
                if (err) {
                    return res.send({
                        code: 500,
                        message: err.message
                    })
                }
                if (results[0]) {
                    return res.send({
                        code: 2,
                        message: '该昵称已被占用'
                    })
                }
                body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
                connection.query('insert into `users` set ?', body, (err, results) => {
                    if (err) {
                        return res.send({
                            code: 500,
                            message: err.message
                        })
                    }
                    res.send({
                        code: 200,
                        message: 'ok'
                    })
                })
            })
        });


    // 3. 响应数据

}

exports.signout = (req, res) => {
    res.send('signout')
}