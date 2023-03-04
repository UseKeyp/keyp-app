import { parseEther, formatEther } from '@ethersproject/units'
import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'

import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { Web3Providers } from 'src/lib/web3/provider'
import { payerSendTransaction } from 'src/lib/web3/wallets'
import { payerAddress } from 'src/lib/web3/wallets/payer'

const MINIMUM_GAS_THRESHOLD = '0.019' // Units of Ether
const DEFAULT_DROP_AMOUNT = '0.025' // Units of Ether

const airdropGasTransaction = async ({ address, amount, network }) => {
  try {
    const tx = {
      to: address,
      value: parseEther(amount),
    }
    return await payerSendTransaction({ unsigned: tx, network })
  } catch (e) {
    logger.error(e?.message || e)
    Sentry.captureException(e)
    throw new Error('airdropGasTransaction() ', e?.message || e)
  }
}

const getEtherBalance = async ({ address, network }) => {
  const balanceBn = await Web3Providers[network].getBalance(address)
  return {
    balance: balanceBn.toString(),
    balanceBn: balanceBn,
    formatted: formatEther(balanceBn),
    decimals: 18,
    symbol: 'ETH',
    name: 'Ethereum',
    tokenAddress: null,
    network,
    chainId: Web3Providers[network]._network.chainId,
  }
}

const checkGasAndAirdrop = async ({
  user,
  amount = DEFAULT_DROP_AMOUNT,
  network,
}) => {
  try {
    if (user.country === 'ETHER') return false // Don't airdrop to Extrernal wallets
    const { balanceBn: balance } = await getEtherBalance({
      address: user.address,
      network,
    })
    const { balanceBn: payerBalance } = await getEtherBalance({
      address: payerAddress,
      network,
    })
    if (balance.lte(parseEther(MINIMUM_GAS_THRESHOLD))) {
      const tx = await airdropGasTransaction({
        address: user.address,
        amount,
        network,
      })
      await notifyDiscord({
        user,
        txHash: tx.hash,
        gasPrice: tx.gasPrice,
        gasLimit: tx.gasLimit,
        payerBalance: formatEther(payerBalance),
      })
      return tx
    }
    return null
  } catch (e) {
    logger.error(e)
    logger.debug({ custom: { user, amount, network } })
    throw new Error(`checkGasAndAirdrop() ${e.message} ${e}`)
  }
}

const notifyDiscord = async ({
  user,
  txHash,
  payerBalance,
  gasPrice,
  gasLimit,
}) => {
  try {
    await sendDiscordAdminAlert({
      embed: {
        color: 16740982,
        title: `✅  Airdrop Submitted!`,
        description: `Username: ${user.username}
Address: ${user.address}
Gas Price: ${gasPrice}
Gas Limit: ${gasLimit}
${getExplorerBaseUrlFromName(process.env.ETHEREUM_NETWORK_NAME)}tx/${txHash}

Payer balance: **${payerBalance}**`,
        footer: { text: new Date().toString() },
      },
      channelName: 'airdrop',
    })
  } catch (e) {
    logger.error(e)
  }
}

module.exports = { checkGasAndAirdrop, getEtherBalance }
