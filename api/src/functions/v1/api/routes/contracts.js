import { logger } from 'src/lib/logger'
import { writeMethod, readMethod } from 'src/lib/web3/contracts'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.post('/method', withUser, async (req, res) => {
  try {
    // Validate juicebox contract address

    const tx = await writeMethod({
      user: req.ctx.user,
      network: req.ctx.network,
      ...req.body,
    })

    res.send(tx)
  } catch (e) {
    logger.error(e)
    return res.status(500).json({
      statusCode: 500,
      error: e,
      message: 'Error validating contract address',
    })
  }
})

router.get('/method', async (req, res) => {
  try {
    const response = await readMethod(req.body)

    res.send(response)
  } catch (e) {
    logger.error(e)
    return res.status(500).json({
      statusCode: 500,
      error: e,
      message: 'Error reading contract',
    })
  }
})

module.exports = router
