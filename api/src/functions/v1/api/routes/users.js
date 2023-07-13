import { getNativeCoinInfo } from '@usekeyp/common'
import {
  getAlchemyNetworkEnum,
  getAlchemyApiKey,
  getBlockExplorerUrl,
} from '@usekeyp/common'
import { Alchemy } from 'alchemy-sdk'

import { addErrorLocation } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { safeFetchUser } from 'src/lib/users'
import { getEtherBalance } from 'src/lib/web3/airdrop.js'
import { getErc20Balance } from 'src/lib/web3/erc20'
import { Web3Providers } from 'src/lib/web3/provider'
import { USDC_DATA_BY_NETWORK } from 'src/lib/web3/usdc'

var express = require('express')
var router = express.Router()

router.get('/:userId/history', async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await safeFetchUser(userId)
    const { network } = req.ctx

    const settings = {
      apiKey: getAlchemyApiKey(network),
      network: getAlchemyNetworkEnum(network),
    }
    const alchemy = new Alchemy(settings)

    const data = await alchemy.core.getAssetTransfers({
      fromAddress: user.address,
      category: ['external', 'erc20', 'erc721', 'erc1155'],
      order: 'desc',
      withMetadata: true,
    })

    const parsedTransfers = await Promise.all(
      data.transfers.map(async (transfer) => {
        const toUser = await safeFetchUser(transfer.to)

        return {
          type: 'TRANSFER', // only transfers for now
          to: {
            username: toUser.username,
            platform: toUser.provider,
            address: toUser.address,
          },
          amount: {
            // type: 'POLYGON_MATIC', //  TODO: add type lookup
            valueBn: {
              type: 'BigNumber',
              hex: transfer.rawContract?.value,
            },
            formatted: transfer.value,
            decimals: Number(transfer.rawContract?.decimal),
            symbol: transfer.asset,
            name: transfer.asset,
            tokenAddress: transfer.rawContract?.address,
            network,
            chainId: Web3Providers[network]._network.chainId,
          },
          timestamp: transfer.metadata?.blockTimestamp,
          hash: transfer.hash,
          explorerUrl: getBlockExplorerUrl(network, transfer.hash),
        }
      })
    )

    // console.log(data.transfers)
    res.send(parsedTransfers)
  } catch (e) {
    next(addErrorLocation('/:userId', e))
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await safeFetchUser(userId)

    res.send(user)
  } catch (e) {
    next(addErrorLocation('/:userId', e))
  }
})

router.get('/:userId/balance', async (req, res, next) => {
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
    next(addErrorLocation('/:userId/balance', e))
  }
})

router.get('/:userId/balance/:tokenAddress', async (req, res, next) => {
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
    next(addErrorLocation('/:userId/balance/:tokenAddress', e))
  }
})

module.exports = router
