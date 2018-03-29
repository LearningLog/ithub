const Topic = require('../modules/topic')

exports.showIndex = (req, res, next) => {
    // 读取话题列表，渲染首页
    Topic.findAll((err, topics) => {
        if (err) {
            return next(err)
        }
        res.render('index.html', {
            topics
        })
    })
}