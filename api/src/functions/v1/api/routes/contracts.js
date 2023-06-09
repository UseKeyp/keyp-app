import { addErrorLocation } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { writeMethod, readMethod } from 'src/lib/web3/contracts/contracts'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.post('/method/write', withUser, async (req, res, next) => {
  try {
    const tx = await writeMethod({
      user: req.ctx.user,
      network: req.ctx.network,
      ...req.body,
    })

    res.send(tx)
  } catch (e) {
    Sentry.captureException(e)
    logger.error({ custom: e }, 'Error in POST /method/write')
    const errorAsString = e.toString()
    res.send({
      tx: {
        type: '',
        chainId: '',
      },
      status: 'FAILED',
      hash: '',
      explorerUrl: '',
      error: e?.message || errorAsString,
    })
    next(addErrorLocation('/method/write', e))
  }
})

router.post('/method/read', withUser, async (req, res, next) => {
  try {
    const response = await readMethod({
      user: req.ctx.user,
      network: req.ctx.network,
      ...req.body,
    })

    res.send(response)
  } catch (e) {
    Sentry.captureException(e)
    logger.error({ custom: e }, 'Error in POST /method/read')
    const errorAsString = e.toString()
    res.send({
      status: 'FAILED',
      explorerUrl: '',
      response: {
        type: '',
        hex: '',
      },
      error: e?.message || errorAsString,
    })
    next(addErrorLocation('/method/read', e))
  }
})

module.exports = router
