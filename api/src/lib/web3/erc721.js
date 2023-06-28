import { EnvelopError } from '@envelop/core'
import { Contract } from '@ethersproject/contracts'
import { getBlockExplorerUrl } from '@usekeyp/common'

import { logger } from 'src/lib/logger'
import { Web3Providers } from 'src/lib/web3/provider'
import { userSendTransaction } from 'src/lib/web3/wallets'

export const getERC721Contract = ({ tokenAddress, network }) => {
  try {
    return new Contract(
      tokenAddress,
      [
        'function ownerOf(uint256) external view returns (address)',
        'function safeTransferFrom(address, address, uint256) public virtual',
      ],
      Web3Providers[network]
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
  network,
}) => {
  let contract
  try {
    contract = getERC721Contract({ tokenAddress, network })
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
    const tx = await userSendTransaction({
      user: fromUser,
      unsignedTx,
      network,
    })
    let explorerUrl = ''
    if (tx && tx.hash) {
      explorerUrl = getBlockExplorerUrl(network, tx.hash)
    }
    tx.explorerUrl = explorerUrl
    return tx
  } catch (e) {
    logger.error(e)
    throw new EnvelopError(`Unable to transfer ERC721 - ${e.message || e}`)
  }
}

export const getERC721Balance = async ({
  contractAddress,
  userAddress,
  network,
}) => {
  let contract
  try {
    contract = getERC721Contract({ tokenAddress: contractAddress, network })
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get ERC721 balance')
  }
  return await contract.balanceOf(userAddress)
}

export const totalSupply = async ({ network, tokenAddress }) => {
  const contract = getERC721Contract({ network, tokenAddress })
  const supply = await contract.totalSupply()
  return supply.toString()
}
