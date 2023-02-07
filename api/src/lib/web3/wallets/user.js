import { Wallet } from '@ethersproject/wallet'

import { logger } from 'src/lib/logger'
import { getTorusWallet } from 'src/lib/torus'
import { getGasSettings } from 'src/lib/web3/gas'
import { Web3Providers } from 'src/lib/web3/provider'

const getUserWalletWithProvider = async ({ userId, network }) => {
  const { privateKey } = await getTorusWallet(userId)
  return new Wallet(privateKey, Web3Providers[network])
}

export const userSignMesage = async ({ userId, message, network }) => {
  const userWalletWithProvider = await getUserWalletWithProvider({
    userId,
    network,
  })
  const signature = await userWalletWithProvider.signMessage(message)
  return signature
}

export const userSendTransaction = async ({ userId, unsignedTx, network }) => {
  try {
    if (process.env.IMPERSONATE_USERNAME)
      return logger.warn(
        { custom: unsignedTx },
        'IMPERSONATE_USERNAME - tx will be skipped'
      )

    const userWalletWithProvider = await getUserWalletWithProvider({
      userId,
      network,
    })
    const gasSettings = await getGasSettings({ network })
    return userWalletWithProvider.sendTransaction({
      ...unsignedTx,
      ...gasSettings,
    })
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    logger.error(e)
    throw new Error(`userSendTransaction() ${e?.message || e}`)
  }
}
