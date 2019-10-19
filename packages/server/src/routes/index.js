var express = require('express')
var router = express.Router()

router.get('/', function(_req, res) {
  res.send('Hello there :)')
})

module.exports = router
