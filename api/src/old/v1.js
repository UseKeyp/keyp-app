import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { fetchUser } from 'src/lib/users'
import { getEtherBalance } from 'src/lib/web3/airdrop.js'
import { transferErc20 } from 'src/lib/web3/erc20'
import { getErc20Balance } from 'src/lib/web3/erc20'
import { transferERC721 } from 'src/lib/web3/erc721'
export const handler = async (event, _context) => {
  logger.debug('Invoked /v1 ')
  try {
    logger.debug({ custom: event }, 'event')
    const pathArray = event.path.split('/')

    let body
    let reqBody = event.body
    try {
      reqBody = JSON.parse(event.body)
    } catch (e) {
      // Do nothing
    }
    logger.debug({ custom: reqBody }, 'reqBody')

    if (pathArray[1] !== 'v1')
      return { statusCode: 500, body: { message: 'Invalid version' } }

    if (pathArray[2] === 'users') {
      const { address: userAddress } = await fetchUser(pathArray[3])
      if (pathArray[4] === 'balance') {
        if (pathArray[5]) {
          // Get balance of specific token
          const tokenAddress = pathArray[5]
          const tokenBalanceData = await getErc20Balance({
            tokenAddress,
            address: userAddress,
          })
          body = { [tokenAddress.toLowerCase()]: tokenBalanceData }
        } else {
          // Get balance of all tokens
          const etherBalanceData = await getEtherBalance(userAddress)
          const usdcBalanceData = await getErc20Balance({
            tokenAddress: process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
            address: userAddress,
          })
          body = {
            ETH: etherBalanceData,
            USDC: usdcBalanceData,
          }
        }
      } else {
        try {
          const user = await fetchUser(pathArray[3])
          body = user
        } catch (e) {
          Sentry.captureException(e)
          logger.error(e)
          return {
            statusCode: 400,
            body: { message: `Error generating user`, e },
          }
        }
      }
    } else if (pathArray[2] === 'transfers') {
      let tx
      if (event.httpMethod === 'POST') {
        if (reqBody.tokenType === 'ERC20') {
          tx = await transferErc20(reqBody)
        } else if (reqBody.tokenType === 'ERC721') {
          tx = await transferERC721(reqBody)
        } else {
          throw 'Invalid token type'
        }
        body = tx
      } else throw 'Invalid method'
    } else {
      throw 'Unsupported path'
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body,
    }
  } catch (e) {
    /* eslint-disable no-console */
    logger.error({ custom: event }, e)
    logger.error({ custom: e })
    logger.error(e)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    return { statusCode: 500, body: e }
  }
}
