import { EnvelopError } from '@envelop/core'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'

import { logger } from 'src/lib/logger'
import { transferErc20 } from 'src/lib/web3/erc20'
import { web3Provider } from 'src/lib/web3/helpers'

export const USDC_DATA_BY_NETWORK = {
  mumbai: {
    address: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
    decimals: 18,
  },
  mainnet: {
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    decimals: 6,
  },
}

export const getUsdcContract = ({ network }) => {
  try {
    return new Contract(
      USDC_DATA_BY_NETWORK[network].address,
      [
        'function balanceOf(address) external view returns (uint256)',
        'function allowance(address, address) external view returns (uint256)',
        'function approve(address, uint256) external returns (bool)',
        'function transfer(address, uint256) external returns (bool)',
      ],
      web3Provider
    )
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

export const getUsdcBalance = async ({ address, network }) => {
  if (!address) throw 'No address provided'
  logger.debug(`getUsdcBalance() address: ${address}`)
  let contract
  try {
    contract = getUsdcContract({ network })
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get USDC balance')
  }

  try {
    const bal = await contract.balanceOf(address)
    return formatUnits(bal, process.env.DECIMALS_PAYMENT_TOKEN)
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get USDC balance')
  }
}

// NOTE: amount is in whole dollars
export const transferUsdc = async ({ toAddress, amount, network }) =>
  transferErc20({
    fromUserId: context.currentUser.id,
    toAddress,
    amount,
    tokenAddress: process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
    network,
  })
