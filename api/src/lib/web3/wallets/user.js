import { Wallet } from '@ethersproject/wallet'
import { web3Provider, getGasSettings } from 'src/lib/web3/helpers'

import { getTorusWallet } from 'src/lib/torus'
import { logger } from 'src/lib/logger'

const getUserWalletWithProvider = async (userId) => {
  const { privateKey } = await getTorusWallet(userId)
  return new Wallet(privateKey, web3Provider)
}

export const userSignMesage = async ({ userId, message }) => {
  const userWalletWithProvider = await getUserWalletWithProvider(userId)
  const signature = await userWalletWithProvider.signMessage(message)
  return signature
}

export const userSendTransaction = async ({ userId, unsignedTx }) => {
  try {
    if (process.env.IMPERSONATE_USERNAME)
      return logger.warn(
        { custom: unsignedTx },
        'IMPERSONATE_USERNAME - tx will be skipped'
      )

    const userWalletWithProvider = await getUserWalletWithProvider(userId)
    const gasSettings = await getGasSettings()
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
