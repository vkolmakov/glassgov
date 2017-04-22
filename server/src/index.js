const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')
const config = require('./config')
const mongoose = require('mongoose')

const app = express()

const cors = require('cors')

mongoose.connect(config.mongoAddress)

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)

const distDir = path.join(__dirname, '../dist/')
app.use('/dist', express.static(distDir))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

const port = process.env.PORT || 3090

app.listen(port)
console.log(`Server listening on ${port}`)
