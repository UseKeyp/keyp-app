import { addErrorLocation } from 'src/lib/helpers'
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

router.post('/transfers', withUser, async (req, res, next) => {
  try {
    const {
      toAddress,
      toUserId,
      toUserUsername,
      toUserProviderType,
      amount,
      tokenAddress,
      tokenType,
      tokenId,
    } = req.body
    // TODO: validate transfer scope

    if ((amount <= 0 || !amount) && tokenType === 'ERC20')
      throw 'Invalid amount'
    if (!tokenId && tokenType === 'ERC721') throw 'Invalid tokenId'
    if (!tokenAddress) throw 'Invalid token address'
    if (!tokenType) throw 'Invalid token type'

    validateToUser({ toAddress, toUserId, toUserUsername, toUserProviderType })

    let recipient
    try {
      if (toUserUsername) {
        recipient = await safeFetchUserByUsername({
          username: toUserUsername,
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
      tx = await transferErc20({
        fromUser: req.ctx.user,
        toUser: recipient,
        amount,
        tokenAddress,
        tokenType,
        network: req.ctx.network,
      })
    } else if (tokenType === 'ERC721') {
      tx = await transferERC721({
        fromUser: req.ctx.user,
        toUser: recipient,
        tokenId,
        tokenAddress,
        tokenType,
        network: req.ctx.network,
      })
    }
    res.send({ status: 'SUCCESS', hash: tx.hash, explorerUrl: tx.explorerUrl })
  } catch (e) {
    Sentry.captureException(e)
    logger.error({ custom: e }, 'Error in POST /transfers')

    const rpcUrlPattern = /(url=".*",)/gm
    if (e?.message) {
      e.message = e.message.replace(rpcUrlPattern, 'url="REDACTED",')
    } else {
      e.message = e.toString()
      e.message = e.message.replace(rpcUrlPattern, 'url="REDACTED",')
    }

    res.send({ status: 'FAILED', hash: '', explorerUrl: '', error: e?.message })
    next(addErrorLocation('/transfers', e))
  }
})

module.exports = router
