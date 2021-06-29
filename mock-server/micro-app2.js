const Koa = require('koa')
const path = require('path')
const staticFiles = require('koa-static')
const cors = require('koa2-cors')
const staticPath = path.join(__dirname + '/vue-app-2')
const app = new Koa()
app.use(cors())
app.use(staticFiles(staticPath))

app.listen(5002, (err) => {
    if (!err) {
        console.log('main server running at 5002')
    }
})

// const fs = require('fs')
// const express = require('express')
// const cors = require('cors')
// const app = express()
// const port = 5002
// app.use(cors)
// app.use(express.static('vue-app-2'))

// app.get('*', (req, res) => {
//     fs.readFile('./vue-app-2/index.html', 'utf-8', (err, html) => {
//         res.send(html)
//     })
// })

// app.listen(port, () => {
//     console.log(`vue-app-2 app listening at http://localhost:${port}`)
// })