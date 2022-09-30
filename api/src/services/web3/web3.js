import { EnvelopError } from '@envelop/core'

import { transferUsdc as _transferUsdc } from 'src/lib/web3/tokens'
import { transferERC721 } from 'src/lib/web3/erc721'
import { transferERC20 } from 'src/lib/web3/erc20'
import { logger } from 'src/lib/logger'
import { fetchUser } from 'src/lib/users'

// TODO: Add back validation for checking if token is approved for external transfer
const validateTransfer = async ({ toAddress, tokenAddress }) => {
  const user = await fetchUser(toAddress)
  logger.debug({ custom: user }, `transfer to ${toAddress}`)
  if (tokenAddress === process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN) {
    // NOTE: Helps prevent undesired USDC transfers
    throw new EnvelopError('To send USDC, you must use the USDC transfer form')
  }
}

export const transferErc20 = async ({ tokenAddress, amount, toAddress }) => {
  await validateTransfer({ toAddress, tokenAddress })
  return transferERC20({
    tokenAddress,
    amount,
    toAddress,
  })
}

export const transferUsdc = async ({ amount, toAddress }) => {
  return _transferUsdc({ amount, toAddress })
}

export const transferErc721 = async ({ tokenAddress, tokenId, toAddress }) => {
  // await validateTransfer({ toAddress })
  return transferERC721({
    tokenAddress,
    tokenId,
    toAddress,
  })
}
