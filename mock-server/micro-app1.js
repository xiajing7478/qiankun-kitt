// const Koa = require('koa')
// const path = require('path')
// const staticFiles = require('koa-static')
// const cors = require('koa2-cors')
// const staticPath = path.join(__dirname + '/vue-app-1')
// const app = new Koa()
// app.use(cors())
// app.use(staticFiles(staticPath))

// app.listen(5001, (err) => {
//     if (!err) {
//         console.log('main server running at 5001')
//     }
// })

const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5001
app.use(cors)
app.use(express.static('vue-app-1'))

app.get('*', (req, res) => {
    fs.readFile('./vue-app-1/index.html', 'utf-8', (err, html) => {
        res.send(html)
    })
})

app.listen(port, () => {
    console.log(`vue-app-1 app listening at http://localhost:${port}`)
})