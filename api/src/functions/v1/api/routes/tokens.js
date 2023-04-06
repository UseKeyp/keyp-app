import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { safeFetchUser, safeFetchUserByUsername } from 'src/lib/users'
import { transferErc20 } from 'src/lib/web3/erc20'
import { transferERC721 } from 'src/lib/web3/erc721'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

// const validateSender = () => {
//   if (req.user.address !== fromUserId)
// }

const validateToUser = ({
  toAddress,
  toUserId,
  toUsername,
  toUserProviderType,
}) => {
  if (toUserId) return
  if (toAddress) return
  if (toUsername && toUserProviderType) return
  return 'Invalid recipient. You must provide either toUserId, toAddress, or toUsername and toUserProviderType'
}

router.post('/transfers', withUser, async (req, res) => {
  try {
    const {
      toAddress,
      toUserId,
      toUsername,
      toUserProviderType,
      amount,
      tokenAddress,
      tokenType,
      tokenId,
    } = req.body
    // TODO: validate transfer scope

    if (!amount && tokenType === 'ERC20') throw 'Invalid amount'
    if (!tokenId && tokenType === 'ERC721') throw 'Invalid tokenId'
    if (!tokenAddress) throw 'Invalid token address'
    if (!tokenType) throw 'Invalid token type'

    validateToUser({ toAddress, toUserId, toUsername, toUserProviderType })

    let recipient
    try {
      if (toUsername) {
        recipient = await safeFetchUserByUsername({
          username: toUsername,
          providerType: toUserProviderType,
        })
      } else {
        recipient = await safeFetchUser(toUserId || toAddress)
      }
    } catch (e) {
      logger.debug(e)
      throw 'Recipient not found'
    }

    if (recipient.address === req.ctx.user.address) throw 'Cannot send to self'
    if (!['ERC20', 'ERC721'].includes(tokenType)) throw 'Invalid token type'

    let tx
    if (tokenType === 'ERC20') {
      try {
        tx = await transferErc20({
          fromUser: req.ctx.user,
          toUser: recipient,
          amount,
          tokenAddress,
          tokenType,
          network: req.ctx.network,
        })
      } catch (e) {
        logger.error({ custom: e }, 'Error in transferErc20')
        Sentry.captureException(e)
        throw e
      }
    } else if (tokenType === 'ERC721') {
      try {
        tx = await transferERC721({
          fromUser: req.ctx.user,
          toUser: recipient,
          tokenId,
          tokenAddress,
          tokenType,
          network: req.ctx.network,
        })
      } catch (e) {
        logger.error({ custom: e }, 'Error in transferErc721')
        Sentry.captureException(e)
        throw e
      }
    }
    res.send({ status: 'SUCCESS', hash: tx.hash })
  } catch (e) {
    Sentry.captureException(e)
    logger.error({ custom: e }, 'Error in POST /transfers')
    const errorAsString = e.toString()
    res.send({ status: 'FAILED', hash: '', error: e?.message || errorAsString })
  }
})

module.exports = router
