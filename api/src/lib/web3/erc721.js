import { EnvelopError } from '@envelop/core'
import { Contract } from '@ethersproject/contracts'

import { logger } from 'src/lib/logger'
import { web3Provider } from 'src/lib/web3/helpers'
import { userSendTransaction } from 'src/lib/web3/wallets'

export const getERC721Contract = (tokenAddress) => {
  try {
    return new Contract(
      tokenAddress,
      [
        'function ownerOf(uint256) external view returns (address)',
        'function safeTransferFrom(address, address, uint256) public virtual',
      ],
      web3Provider
    )
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

// NOTE: If "to" refers to a smart contract, it must implement
// IERC721Receiver.onERC721Received, which is called upon a safe transfer.
export const transferERC721 = async ({
  fromUser,
  toUser,
  tokenAddress,
  tokenId,
}) => {
  let contract
  try {
    contract = getERC721Contract(tokenAddress)
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to transfer ERC721', e.me)
  }

  const { address: toAddress } = toUser
  const { address: fromAddress } = fromUser
  try {
    const ownerAddress = await contract.ownerOf(tokenId)
    if (fromAddress.toLowerCase() !== ownerAddress.toLowerCase())
      throw new EnvelopError('You do not own this token')

    const unsignedTx = await contract.populateTransaction.safeTransferFrom(
      fromAddress,
      toAddress,
      tokenId
    )
    const tx = await userSendTransaction({ userId: fromUser.id, unsignedTx })
    return tx
  } catch (e) {
    logger.error(e)
    throw new EnvelopError(`Unable to transfer ERC721 - ${e.message}`)
  }
}

export const getERC721Balance = async ({ contractAddress, userAddress }) => {
  let contract
  try {
    contract = getERC721Contract(contractAddress)
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get ERC721 balance')
  }
  return await contract.balanceOf(userAddress)
}

export const totalSupply = async () => {
  const contract = getERC721Contract()
  const supply = await contract.getTotalGames()
  return supply.toString()
}
