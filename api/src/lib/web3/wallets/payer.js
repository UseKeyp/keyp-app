import { Wallet } from '@ethersproject/wallet'

import { logger } from 'src/lib/logger'
import { getGasSettings } from 'src/lib/web3/gas'
import { Web3Providers } from 'src/lib/web3/provider'

const payerWallet = Wallet.fromMnemonic(
  process.env.PAYER_WALLET_MNEMONIC.replace(/,/g, ' ')
)

const validateConfig = (wallet) => {
  if (
    wallet.address.toLowerCase() !==
    process.env.PAYER_WALLET_ADDRESS.toLowerCase()
  )
    throw 'Payer wallet address and mnemonic do not match'
}

export const payerSendTransaction = async ({ unsigned, network }) => {
  validateConfig(payerWallet)
  try {
    logger.debug({ custom: Web3Providers[network].connection }, 'Web3Providers')
    const payerWalletWithProvider = payerWallet.connect(Web3Providers[network])
    const gasSettings = await getGasSettings({ network })
    return await payerWalletWithProvider.sendTransaction({
      ...unsigned,
      ...gasSettings,
    })
  } catch (e) {
    logger.error(e)
    throw new Error(`payerSendTransaction() ${e}`)
  }
}

export const payerAddress = payerWallet.address
