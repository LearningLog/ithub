const moment = require('moment')
const Topic = require('../modules/topic')
exports.showCreate = (req, res) => {
    res.render('topic/create.html')
}

// exports.create = (req, res) => {
//     // res.send('create')
//     const body = req.body
//     body.userId = req.session.user.id
//     body.createdAt  = moment().format('YYYY-MM-DD HH:mm:ss')
//     Topic.create(body, (err, results) => {
//         if (err) {
//             return res.send({
//                 code: 500,
//                 message: err.message
//             })
//         }
//         res.send({
//             code: 200,
//             message: '成功发表话题'
//         })
//     })
// }
exports.create = (req, res) => {
    const body = req.body
    console.log(body)
    body.userId = req.session.user.id // 话题的作者，就是当前登陆用户
    body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss') // 话题的创建时间

    Topic.create(body, (err, results) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        res.send({
            code: 200,
            message: '创建话题成功了'
        })
    })
}
exports.showTopic = (req, res) => {
    res.render('topic/edit.html')
}

exports.showEdit = (req, res) => {
    res.render('settings/admin.html')
}

exports.edit = (req, res) => {
    res.render('topic/edit.html')
}

exports.delete = (req, res) => {
    res.render('settings/profile.html')
}