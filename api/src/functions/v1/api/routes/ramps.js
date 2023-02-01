import { getRampOnUrl } from 'src/lib/ramps'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.get('/on/:rampType', withUser, async (req, res) => {
  const { rampType } = req.params
  const { url } = await getRampOnUrl({
    type: rampType.toUpperCase(),
    user: req.ctx.user,
  })

  res.send(url)
})

module.exports = router
