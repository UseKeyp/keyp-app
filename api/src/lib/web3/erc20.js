import { web3Provider } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { EnvelopError } from '@envelop/core'
import { logger } from 'src/lib/logger'
import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'
import { userSendTransaction } from 'src/lib/web3/wallets'
import { fetchUser } from 'src/lib/users'
export const getTokenContract = ({ tokenAddress }) => {
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
      web3Provider
    )
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

export const getErc20Balance = async ({ tokenAddress, address }) => {
  if (!address) throw 'No address provided'
  if (!tokenAddress) throw 'No address provided'
  logger.debug(
    `getErc20Balance() tokenAddress: ${tokenAddress} address: ${address}`
  )
  let contract
  try {
    contract = getTokenContract({ tokenAddress })
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
      network: process.env.ETHEREUM_NETWORK_NAME,
      chainId: web3Provider._network.chainId,
    }
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get ERC20 balance')
  }
}

export const transferErc20 = async ({
  fromUserId,
  toAddress,
  toUserId,
  amount,
  tokenAddress,
}) => {
  if (!toAddress && !toUserId && !context.currentUser)
    throw 'No toAddress or toUserId provided'
  if (toAddress && toUserId) throw 'Both toAddress and toUserId provided'
  if (!amount) throw 'No amount provided'
  if (!fromUserId) throw 'No fromUserId provided'
  if (!tokenAddress) throw 'No tokenAddress provided'
  let contract
  try {
    let sender = context.currentUser
    if (fromUserId) sender = await fetchUser(fromUserId)
    let receiver = { address: toAddress }
    if (!toAddress) receiver = await fetchUser(toUserId)

    const gettingGas = await checkGasAndAirdrop({ user: sender })
    if (gettingGas)
      throw "Try again in a few minutes, we're sending some gas to your wallet."

    contract = getTokenContract({ tokenAddress })
    const bal = await contract.balanceOf(sender.address)

    let amountBn
    let balance
    if (
      tokenAddress.toLowerCase() ===
      process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN.toLowerCase()
    ) {
      // USDC Error messaging
      amountBn = parseUnits(amount, process.env.DECIMALS_PAYMENT_TOKEN)
      balance = formatUnits(bal, process.env.DECIMALS_PAYMENT_TOKEN)
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
      const amountBn = parseUnits(amount, decimals)
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
      toAddress || receiver.address,
      amountBn
    )
    const tx = await userSendTransaction({
      userId: fromUserId,
      unsignedTx,
    })
    return tx
  } catch (e) {
    logger.error(e)
    throw new EnvelopError(`Request failed - ${e?.message || e}`)
  }
}
