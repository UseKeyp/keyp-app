import { fetchUser } from 'src/lib/users'
import { getEtherBalance } from 'src/lib/web3/airdrop.js'
import { getErc20Balance } from 'src/lib/web3/erc20'

var express = require('express')
var router = express.Router()

router.get('/:userId/balance', async (req, res) => {
  const { userId } = req.params
  const user = await fetchUser(userId)

  const etherBalanceData = await getEtherBalance(user.address)
  const usdcBalanceData = await getErc20Balance({
    tokenAddress: process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
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

router.get('/:userId', async (req, res) => {
  const { userId } = req.params
  const user = await fetchUser(userId)

  res.send(user)
})

module.exports = router
