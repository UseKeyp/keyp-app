import { getNativeCoinInfo } from '@usekeyp/common'

import { logger } from 'src/lib/logger'
import { safeFetchUser } from 'src/lib/users'
import { getEtherBalance } from 'src/lib/web3/airdrop.js'
import { getErc20Balance } from 'src/lib/web3/erc20'
import { USDC_DATA_BY_NETWORK } from 'src/lib/web3/usdc'

var express = require('express')
var router = express.Router()

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const user = await safeFetchUser(userId)

    res.send(user)
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: e })
  }
})

router.get('/:userId/balance', async (req, res) => {
  try {
    const { userId } = req.params
    const user = await safeFetchUser(userId)
    const nativeTokenBalanceData = await getEtherBalance({
      address: user.address,
      network: req.ctx.network,
    })

    const nativeCoinInfo = getNativeCoinInfo(req.ctx.network)

    let usdcBalanceData
    try {
      const tokenAddress = USDC_DATA_BY_NETWORK[req.ctx.network]?.address
      if (tokenAddress)
        usdcBalanceData = await getErc20Balance({
          tokenAddress,
          address: user.address,
          network: req.ctx.network,
        })
    } catch (e) {
      logger.error(e)
      // Do nothing, just don't send USDC balance data
    }
    res.send({
      [nativeCoinInfo.symbol]: nativeTokenBalanceData,
      ...(usdcBalanceData && { USDC: usdcBalanceData }),
    })
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: e })
  }
})

router.get('/:userId/balance/:tokenAddress', async (req, res) => {
  try {
    const { userId, tokenAddress } = req.params
    const user = await safeFetchUser(userId)

    const tokenBalanceData = await getErc20Balance({
      tokenAddress,
      address: user.address,
      network: req.ctx.network,
    })

    res.send({ [tokenAddress.toLowerCase()]: tokenBalanceData })
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: e })
  }
})

module.exports = router
