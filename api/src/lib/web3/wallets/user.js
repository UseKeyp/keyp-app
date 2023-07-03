import { Wallet } from '@ethersproject/wallet'

import { logger } from 'src/lib/logger'
import { getTorusWallet } from 'src/lib/torus'
import { getGasSettings } from 'src/lib/web3/gas'
import { Web3Providers } from 'src/lib/web3/provider'

export const getUserWalletWithProvider = async ({ user, network }) => {
  const { privateKey } = await getTorusWallet(user)
  return new Wallet(privateKey, Web3Providers[network])
}

export const userSignMesage = async ({ user, message, network }) => {
  const userWalletWithProvider = await getUserWalletWithProvider({
    user,
    network,
  })
  return await userWalletWithProvider.signMessage(message)
}

export const userSendTransaction = async ({
  user,
  unsignedTx,
  network,
  value,
}) => {
  try {
    if (process.env.IMPERSONATE_USERNAME)
      return logger.warn(
        { custom: unsignedTx },
        'IMPERSONATE_USERNAME - tx will be skipped'
      )

    const userWalletWithProvider = await getUserWalletWithProvider({
      user,
      network,
    })
    const gasSettings = await getGasSettings({ network })
    return userWalletWithProvider.sendTransaction({
      ...unsignedTx,
      value,
      ...gasSettings,
    })
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    logger.error(e)
    throw new Error(`userSendTransaction() ${e?.message || e}`)
  }
}
