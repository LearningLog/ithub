

exports.showIndex = (req,res) => {
    res.render('index.html',{
        // 把会话用户信息传递到模板，模板就可以使用当前登录的用户了
        user: req.session.user
    })
}