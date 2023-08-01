import { parseEther, formatEther } from '@ethersproject/units'
import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'
import { getNativeCoinInfo } from '@usekeyp/common'

import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { gasConfigByNetwork } from 'src/lib/web3/airdrop/gasConfig'
import { Web3Providers } from 'src/lib/web3/provider'
import { payerSendTransaction } from 'src/lib/web3/wallets'
import { payerAddress } from 'src/lib/web3/wallets/payer'

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

const getNativeCoinBalance = async ({ address, network }) => {
  const balanceBn = await Web3Providers[network].getBalance(address)
  const nativeCoinInfo = getNativeCoinInfo(network)
  return {
    balance: balanceBn.toString(),
    balanceBn: balanceBn,
    formatted: formatEther(balanceBn),
    decimals: 18,
    symbol: nativeCoinInfo.symbol,
    name: nativeCoinInfo.name,
    tokenAddress: null,
    network,
    chainId: Web3Providers[network]._network.chainId,
  }
}

const checkGasAndAirdrop = async ({ user, amount, network }) => {
  try {
    if (user.country === 'ETHER') return false // Don't airdrop to External wallets
    const { balanceBn: balance } = await getNativeCoinBalance({
      address: user.address,
      network,
    })
    const { balanceBn: payerBalance } = await getNativeCoinBalance({
      address: payerAddress,
      network,
    })
    const GAS_CONFIG = gasConfigByNetwork({ network })
    let dropAmount = GAS_CONFIG.DEFAULT_DROP_AMOUNT
    if (balance.isZero()) dropAmount = GAS_CONFIG.INITIAL_DROP_AMOUNT
    if (amount) dropAmount = amount
    logger.debug(`checkGasAndAirdrop() user.address: ${user.address}`)
    logger.debug(`checkGasAndAirdrop() balance \n${balance}`)
    logger.debug(
      `checkGasAndAirdrop() parseEther(GAS_CONFIG.MINIMUM_GAS_DROP_THRESHOLD): \n${parseEther(
        GAS_CONFIG.MINIMUM_GAS_DROP_THRESHOLD
      )}`
    )

    if (balance.lte(parseEther(GAS_CONFIG.MINIMUM_GAS_DROP_THRESHOLD))) {
      const tx = await airdropGasTransaction({
        address: user.address,
        amount: dropAmount,
        network,
      })
      await notifyDiscord({
        user,
        network,
        txHash: tx.hash,
        payerBalance: formatEther(payerBalance),
      })
      return tx
    }
    return null
  } catch (e) {
    logger.error(e)
    logger.error(`🚫💰😭 Payer balance low on ${network}`)
    await sendDiscordAdminAlert({
      embed: {
        color: 15548997,
        title: `🚫💰😭 Keyp payer balance low on ${network}`,
        description: `${getExplorerBaseUrlFromName(
          network
        )}address/${payerAddress}`,
        footer: { text: new Date().toString() },
      },
      channelName: 'warning',
    })
  }
}

const notifyDiscord = async ({ user, txHash, payerBalance, network }) => {
  try {
    await sendDiscordAdminAlert({
      embed: {
        color: 16740982,
        title: `🪂🪙 Keyp Airdrop on ${network} `,
        description: `Username: ${user.username}
Address: ${user.address}
${getExplorerBaseUrlFromName(network)}tx/${txHash}

Payer balance: **${payerBalance}**`,
        footer: { text: new Date().toString() },
      },
      channelName: 'airdrop',
    })
  } catch (e) {
    logger.error(e)
  }
}

module.exports = { checkGasAndAirdrop, getEtherBalance: getNativeCoinBalance }
