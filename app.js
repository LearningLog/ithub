const express = require('express')
const router = require('./router')
const app = express()

app.use(router)

app.listen(3000, () => {
    console.log('running 3000...')
})