const moment = require('moment')
const marked = require('marked')
const Topic = require('../modules/topic')
exports.showCreate = (req, res, next) => {
    res.render('topic/create.html')
}

exports.create = (req, res, next) => {
    // res.send('create')
    const body = req.body
    body.userId = req.session.user.id
    body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    Topic.create(body, (err, results) => {
        if (err) {
            // return res.send({
            //     code: 500,
            //     message: err.message
            // })
            return next()
        }
        res.send({
            code: 200,
            message: '成功发表话题'
        })
    })
}
// exports.create = (req, res,next) => {
//     const body = req.body
//     console.log(body)
//     body.userId = req.session.user.id // 话题的作者，就是当前登陆用户
//     body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss') // 话题的创建时间

//     Topic.create(body, (err, results) => {
//         if (err) {
//             return res.send({
//                 code: 500,
//                 message: err.message
//             })
//         }
//         res.send({
//             code: 200,
//             message: '创建话题成功了'
//         })
//     })
// }
exports.show = (req, res, next) => {
    const {topicId} = req.params
    console.log(topicId)
    Topic.findById(topicId, (err, topic) => {
        if (err) {
            return next(err)
        }
        topic.content = marked(topic.content)
        res.render('topic/show.html', {
            topic
        })
    })
}

exports.showEdit = (req, res, next) => {
    const {topicId} = req.params
    console.log(topicId)
    Topic.findById(topicId, (err, topic) => {
        if (err) {
            return next()
        }
        res.render('topic/edit.html', {
            topic
        })
    })
}

exports.edit = (req, res, next) => {
    const {
        topicId
    } = req.params
    const body = req.body
    Topic.updateById(topicId, body, (err, results) => {
        if (err) {
            return next(err)
        }
        res.send({
            code: 200,
            message: '修改话题成功'
        })
    })

}

exports.delete = (req, res, next) => {
    const {topicId} = req.params
    Topic.deleteById(topicId, (err, results) => {
        if(err) {
            return next(err)
        }
        res.send({
            code: 200,
            message: '删除成功'
        })
    })
}