// 0.加载 express
const express = require('express')

// 1.调用 express.Router() 实例化一个router 路由

const router = express.Router()

// 2. 为路由 router 添加申请处理
router.get('/', (req, res) => {
    console.log('11111')
})

// 3. 导出 路由 router
module.exports = router

// 4. 在 app.js 中：app.use(路由名称)