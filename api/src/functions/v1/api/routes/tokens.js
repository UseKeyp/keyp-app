import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { fetchUser } from 'src/lib/users'
import { transferErc20 } from 'src/lib/web3/erc20'
import { transferERC721 } from 'src/lib/web3/erc721'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

// const validateSender = () => {
//   if (req.user.address !== fromUserId)
// }

router.post('/transfers', withUser, async (req, res) => {
  try {
    const { toAddress, toUserId, amount, tokenAddress, tokenType } = req.body

    // TODO: validate transfer scope
    if (!toAddress && !toUserId) throw 'Invalid recipient'
    if (!amount) throw 'Invalid amount'
    if (!tokenAddress) throw 'Invalid token address'
    if (!tokenType) throw 'Invalid token type'

    const recipient = await fetchUser(toUserId || toAddress)

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
        amount,
        tokenAddress,
        tokenType,
        network: req.ctx.network,
      })
    }

    res.send({ tx })
  } catch (e) {
    Sentry.captureException(e)
    logger.error({ custom: e }, 'Error in POST /transfers')
    res.status(500).send({ error: e })
  }
})

module.exports = router
