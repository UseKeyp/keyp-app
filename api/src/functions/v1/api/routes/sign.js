import { withUser } from 'src/functions/v1/api/middleware/user'
import { addErrorLocation } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { userSignMessage } from 'src/lib/web3/wallets/user'

var express = require('express')
var router = express.Router()

router.post('/', withUser, async (req, res, next) => {
  try {
    const { network } = req.ctx
    const user = req.ctx.user
    const { message } = req.body

    if (!user || !message || !network) {
      throw 'Invalid request. Missing user, message, or network'
    }

    let signedMessage
    try {
      signedMessage = await userSignMessage({ user, message, network })
    } catch (e) {
      logger.error(e, 'Error when signing the message')
      throw e
    }

    res.send({ status: 'SUCCESS', signedMessage })
  } catch (e) {
    Sentry.captureException(e)
    logger.error({ custom: e }, 'Error in POST /sign')
    res.send({ status: 'FAILED', error: e })
    next(addErrorLocation('/sign', e))
  }
})

module.exports = router
