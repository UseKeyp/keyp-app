import { getAlchemyNetworkEnum } from '@usekeyp/common'
import { Alchemy } from 'alchemy-sdk'

import { addErrorLocation } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { safeFetchUser } from 'src/lib/users'

var express = require('express')
var router = express.Router()

router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params
    if (!userId) {
      throw 'No userId provided'
    }
    const settings = {
      apiKey: process.env.ALCHEMY_API_KEY,
      network: getAlchemyNetworkEnum(req.ctx.network),
    }
    const alchemy = new Alchemy(settings)
    const user = await safeFetchUser(userId)
    const nfts = await alchemy.nft.getNftsForOwner(user.address)
    res.send(nfts)
  } catch (e) {
    Sentry.captureException(e)
    logger.error({ custom: e }, 'Error in GET /:userId (nfts)')
    next(addErrorLocation('/:userId (nfts)', e))
  }
})

module.exports = router
