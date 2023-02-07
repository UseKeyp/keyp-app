import { fetchUser } from 'src/lib/users'
import { getEtherBalance } from 'src/lib/web3/airdrop.js'
import { getErc20Balance } from 'src/lib/web3/erc20'
import { USDC_DATA_BY_NETWORK } from 'src/lib/web3/usdc'

var express = require('express')
var router = express.Router()

router.get('/:userId', async (req, res) => {
  const { userId } = req.params
  const user = await fetchUser(userId)

  res.send(user)
})

router.get('/:userId/balance', async (req, res) => {
  const { userId } = req.params
  const user = await fetchUser(userId)
  const etherBalanceData = await getEtherBalance({
    address: user.address,
    network: req.ctx.network,
  })
  const usdcBalanceData = await getErc20Balance({
    tokenAddress: USDC_DATA_BY_NETWORK[req.ctx.network].address,
    address: user.address,
  })
  res.send({ ETH: etherBalanceData, USDC: usdcBalanceData })
})

router.get('/:userId/balance/:tokenAddress', async (req, res) => {
  const { userId, tokenAddress } = req.params
  const user = await fetchUser(userId)

  const tokenBalanceData = await getErc20Balance({
    tokenAddress,
    address: user.address,
  })

  res.send({ [tokenAddress.toLowerCase()]: tokenBalanceData })
})

module.exports = router
