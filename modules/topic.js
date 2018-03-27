const db = require('../modules/db-handler')
// 展示话题
/**
 * 
 * @param {Function} callback 回到函数
 * @return {undefined} 没有返回值 
 */
exports.findAll = callback => {
    const sqlStr = ' selsect * from `topics` ';
    db.query(sqlStr, (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results)
    })
}
// 创建话题
/**
 * 
 * @param {Object} topic 话题对象
 * @param {Function} callback 回调函数
 */
// exports.create = (topic, callback) => {
//     const sqlStr = ' insert into `topics` set ? ';
//     db.query(sqlStr, topic, (err, results) => {
//         if (err) {
//             return callback(err)
//         }
//         callback(null, results)
//     })
// }
exports.create = (topic, callback) => {
    const sqlStr = 'INSERT INTO `topics` SET ?'
    db.query(
        sqlStr,
        topic,
        (err, results) => {
            if (err) {
                return callback(err)
            }
            callback(null, results)
        }
    )
}
// 修改话题
/**
 * 
 * @param {Object} topic 话题对象
 * @param {Function} callback 回调函数
 */
exports.editById = (topic, callback) => {
    const sqlStr = ' update `topics` set `title`=?, `content`=? where `id`=? ';
    db.query(sqlStr, topic, (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results)
    })
}
// 删除话题
/**
 * 
 * @param {number} id 话题id
 * @param {Function} callback 回调函数
 */
exports.deleteById = (id, callback) => {
    const sqlStr = ' delete from `topics` where `id`=? ';
    db.query(sqlStr, id, (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results)
    })
}