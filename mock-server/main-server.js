// const Koa = require('koa')
// const path = require('path')
// const staticFiles = require('koa-static')
// const cors = require('koa2-cors')
// const staticPath = path.resolve(__dirname + '/main-project')
// const app = new Koa()
// app.use(cors())
// app.use(staticFiles(staticPath))

// app.get(',')

// app.listen(5000, (err) => {
//     if (!err) {
//         console.log('main server running at 5000')
//     }
// })

// 参考 https://my.oschina.net/u/3849658/blog/4930704?_from=gitee_search
// 参考 https://juejin.cn/post/6973111766767108103

const fs = require('fs')
const express = require('express')
const app = express()
const port = 5000
app.use(express.static('main-project'))

app.get('*', (req, res) => {
    fs.readFile('./main-project/index.html', 'utf-8', (err, html) => {
        res.send(html)
    })
})

app.listen(port, () => {
    console.log(`main app listening at http://localhost:${port}`)
})