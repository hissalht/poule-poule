const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const io = require('./io')

/**
 * Configure the express application.
 * @param {express.Application} app
 */
function configureServer(app) {
  app.use(logger('dev'))
  app.use(express.static(path.join(__dirname, 'public')))
  app.io = io
}

module.exports = configureServer
