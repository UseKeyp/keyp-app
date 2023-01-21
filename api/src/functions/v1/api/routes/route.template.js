import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { fetchUser } from 'src/lib/users'

var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
  const { userProvider, userId } = req.ctx

  res.send()
})

module.exports = router
