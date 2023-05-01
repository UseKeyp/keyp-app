import { logger } from 'src/lib/logger'
import { getRampOnUrl, getRampOffUrl } from 'src/lib/ramps'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.get('/on/:rampType', withUser, async (req, res) => {
  try {
    const { rampType } = req.params
    const { url } = await getRampOnUrl({
      type: rampType.toUpperCase(),
      user: req.ctx.user,
      network: req.ctx.network,
    })

    res.send({ url })
  } catch (e) {
    logger.error(e)
    return res.status(500).json({
      statusCode: 500,
      error: e,
      message: 'Error fetching onramp',
    })
  }
})

router.get('/off/:rampType', withUser, async (req, res) => {
  try {
    const { rampType } = req.params
    const { url } = await getRampOffUrl({
      type: rampType.toUpperCase(),
      user: req.ctx.user,
    })

    res.send({ url })
  } catch (e) {
    logger.error(e)
    return res.status(500).json({
      statusCode: 500,
      error: e,
      message: 'Error fetching offramp',
    })
  }
})

module.exports = router
