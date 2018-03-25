exports.showCreate = (req,res) => {
    res.render('topic/create.html')
}

exports.create = (req,res) => {
    res.render('topic/new.html')
}

exports.showTopic = (req,res) => {
    res.render('topic/edit.html')
}

exports.showEdit = (req,res) => {
    res.render('settings/admin.html')
}

exports.edit = (req,res) => {
    res.render('topic/edit.html')
}

exports.delete = (req,res) => {
    res.render('settings/profile.html')
}
