import { withUser } from 'src/functions/v1/api/middleware/user'
import { addErrorLocation } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { getUserWalletWithProvider } from 'src/lib/web3/wallets/user'

var express = require('express')
var router = express.Router()

router.post('/', withUser, async (req, res, next) => {
  try {
    const { network } = req.ctx
    const user = req.ctx.user
    const { unsignedTx } = req.body

    if (!user || !unsignedTx || !network) {
      throw 'Invalid request. Missing user, unsignedTx, or network'
    }

    let signedTx
    try {
      const userWalletWithProvider = await getUserWalletWithProvider({
        user,
        network,
      })
      const populatedTx = await userWalletWithProvider.populateTransaction(
        unsignedTx
      )
      signedTx = await userWalletWithProvider.signTransaction(populatedTx)
    } catch (e) {
      logger.error(e, 'Error when signing the transaction')
      throw e
    }

    res.send({ status: 'SUCCESS', signedTx })
  } catch (e) {
    Sentry.captureException(e)
    logger.error({ custom: e }, 'Error in POST /sign')
    res.send({ status: 'FAILED', error: e })
    next(addErrorLocation('/sign', e))
  }
})

module.exports = router
