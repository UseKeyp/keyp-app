import { EnvelopError } from '@envelop/core'

import { transferERC721 } from 'src/lib/web3/erc721'
import { fetchMember } from 'src/lib/users'
import { logger } from 'src/lib/logger'

const validateTransfer = async ({ toAddress }) => {
  const user = await fetchMember(toAddress)
  logger.debug({ custom: user }, `transfer to ${toAddress}`)
  if (!user || user.country === 'ETHER')
    throw new EnvelopError(
      'External transfers are not enabled yet. Recipient must be a Treasure Chess user.'
    )
}

export const transferErc20 = async ({ _tokenAddress, _amount, toAddress }) => {
  await validateTransfer({ toAddress })
  throw new EnvelopError(`Transfer type "ERC20" is not yet supported.`)
}
export const transferErc721 = async ({ tokenAddress, tokenId, toAddress }) => {
  await validateTransfer({ toAddress })
  return transferERC721({
    tokenAddress,
    tokenId,
    toAddress,
    user: context.currentUser,
  })
}
