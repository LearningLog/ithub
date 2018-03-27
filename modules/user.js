const db = require('./db-handler')


// 通过邮箱获取用户信息
exports.getByEmail = function (email, callback) {
    const sqlStr = 'SELECT * FROM `users` WHERE `email`=?';
    db.query(
        sqlStr, [email], 
        (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results[0])
    })
}
// 通过邮箱获取用户信息
exports.getByNickname = function (nickname, callback) {
    const sqlStr = 'SELECT * FROM `users` WHERE `email`=?';
    db.query(sqlStr, [nickname], (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results[0])
    })
}

// 写入用户信息
exports.createUser = function (user, callback) {
    const sqlStr = 'insert into `users` set ?';
    db.query(sqlStr, user, (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results)
    })
}