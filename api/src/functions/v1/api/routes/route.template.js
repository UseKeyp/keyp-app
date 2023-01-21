import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.get('/', withUser, async (req, res) => {
  const { user, userProvider, userId } = req.ctx

  res.send()
})

module.exports = router
