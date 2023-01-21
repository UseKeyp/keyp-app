import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { fetchUser } from 'src/lib/users'
import { getEtherBalance } from 'src/lib/web3/airdrop.js'
import { getErc20Balance } from 'src/lib/web3/erc20'

var express = require('express')
var router = express.Router()

// const { address: userAddress } = await fetchUser(pathArray[3])
// if (pathArray[4] === 'balance') {
//   if (pathArray[5]) {
//     // Get balance of specific token
//     const tokenAddress = pathArray[5]
//     const tokenBalanceData = await getErc20Balance({
//       tokenAddress,
//       address: userAddress,
//     })
//     body = { [tokenAddress.toLowerCase()]: tokenBalanceData }
//   } else {
//     // Get balance of all tokens
//     const etherBalanceData = await getEtherBalance(userAddress)
//     const usdcBalanceData = await getErc20Balance({
//       tokenAddress: process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
//       address: userAddress,
//     })
//     body = {
//       ETH: etherBalanceData,
//       USDC: usdcBalanceData,
//     }
//   }
// } else {
//   try {
//     const user = await fetchUser(pathArray[3])
//     body = user
//   } catch (e) {
//     Sentry.captureException(e)
//     logger.error(e)
//     return {
//       statusCode: 400,
//       body: { message: `Error generating user`, e },
//     }
//   }
// }

router.get('/', async (req, res) => {
  const { userProvider, userId } = req.ctx

  res.send()
})

module.exports = router
