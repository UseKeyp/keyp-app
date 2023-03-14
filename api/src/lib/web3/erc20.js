import { EnvelopError } from '@envelop/core'
import { Contract } from '@ethersproject/contracts'
import { formatUnits, parseUnits } from '@ethersproject/units'

import { logger } from 'src/lib/logger'
import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'
import { Web3Providers } from 'src/lib/web3/provider'
import { USDC_DATA_BY_NETWORK } from 'src/lib/web3/usdc'
import { userSendTransaction } from 'src/lib/web3/wallets'

const getTokenContract = ({ tokenAddress, network }) => {
  try {
    return new Contract(
      tokenAddress,
      [
        'function balanceOf(address) external view returns (uint256)',
        'function allowance(address, address) external view returns (uint256)',
        'function approve(address, uint256) external returns (bool)',
        'function transfer(address, uint256) external returns (bool)',
        'function decimals() external view returns (uint256)',
        'function symbol() external view returns (string)',
        'function name() external view returns (string)',
      ],
      Web3Providers[network]
    )
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

export const getErc20Balance = async ({ tokenAddress, address, network }) => {
  if (!address) throw 'No address provided'
  if (!tokenAddress) throw 'No address provided'
  if (!network) throw 'No network provided'
  logger.debug(
    `getErc20Balance() tokenAddress: ${tokenAddress} address: ${address}`
  )
  let contract
  try {
    contract = getTokenContract({ tokenAddress, network })
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get ERC20 balance')
  }

  try {
    const decimals = await contract.decimals()
    const balanceBn = await contract.balanceOf(address)
    const symbol = await contract.symbol()
    const name = await contract.name()
    return {
      balance: balanceBn.toString(),
      balanceBn: balanceBn,
      formatted: formatUnits(balanceBn, decimals),
      decimals: decimals.toString(),
      symbol,
      name,
      tokenAddress,
      network,
      chainId: Web3Providers[network]._network.chainId,
    }
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get ERC20 balance')
  }
}

export const transferErc20 = async ({
  fromUser,
  toUser,
  amount,
  tokenAddress,
  network,
}) => {
  if (!toUser) throw 'No toUser provided'
  if (!fromUser) throw 'No fromUser provided'
  if (!amount) throw 'No amount provided'
  if (!tokenAddress) throw 'No tokenAddress provided'
  if (!network) throw 'No network provided'

  let contract
  try {
    const { address: toAddress } = toUser
    const { address: fromAddress } = fromUser
    const gettingGas = await checkGasAndAirdrop({ user: fromUser, network })
    if (gettingGas)
      throw "Try again in a few minutes, we're sending some gas to your wallet."

    contract = getTokenContract({ tokenAddress, network })
    const bal = await contract.balanceOf(fromAddress)

    let amountBn
    let balance
    if (
      tokenAddress.toLowerCase() ===
      USDC_DATA_BY_NETWORK[network]?.address.toLowerCase()
    ) {
      // USDC Error messaging
      amountBn = parseUnits(amount, USDC_DATA_BY_NETWORK[network].decimals)
      balance = formatUnits(bal, USDC_DATA_BY_NETWORK[network].decimals)
      if (bal.lt(amountBn))
        throw `Amount exceeds your current balance of $${
          Number(balance) > 0
            ? Number(balance).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : 0
        }`
    } else {
      const decimals = await contract.decimals()
      amountBn = parseUnits(amount, decimals)
      const balance = formatUnits(bal, decimals)
      if (bal.lt(amountBn))
        throw `Amount exceeds your current balance of ${
          Number(balance) > 0
            ? Number(balance).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })
            : 0
        }`
    }
    const unsignedTx = await contract.populateTransaction.transfer(
      toAddress,
      amountBn
    )
    const tx = await userSendTransaction({
      userId: fromUser.id,
      unsignedTx,
      network,
    })
    return tx
  } catch (e) {
    logger.error(e)
    throw new EnvelopError(`Unable to transfer ERC20 - ${e?.message || e}`)
  }
}
