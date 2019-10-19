const express = require('express')

const configure = require('./configure')
const indexRouter = require('./routes/index')

const app = express()

configure(app)

app.use('/', indexRouter)

module.exports = app
