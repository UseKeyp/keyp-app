import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.get('/:rampType', withUser, async (req, res) => {
  const { rampType } = req.params
  const { url } = await getRampOnUrl({ type, user: req.ctx.user })

  res.send(url)
})

module.exports = router
