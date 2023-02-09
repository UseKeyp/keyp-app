import { Wallet } from '@ethersproject/wallet'

import { logger } from 'src/lib/logger'
import { getGasSettings } from 'src/lib/web3/gas'
import { Web3Providers } from 'src/lib/web3/provider'

const adminWallet = Wallet.fromMnemonic(
  process.env.APP_ADMIN_WALLET_MNEMONIC.replace(/,/g, ' ')
)

const validateConfig = (_wallet) => {
  // TODO: re-enable this validation when adding back the admin wallet
  return true
  // if (
  //   wallet.address.toLowerCase() !==
  //   process.env.APP_ADMIN_WALLET_ADDRESS.toLowerCase()
  // )
  //   throw 'Admin wallet address and mnemonic do not match'
}

// Currently unused
// const adminSign = async (unsigned) => adminWallet.signTransaction(unsigned)

export const getAdminBalance = async ({ network }) =>
  Web3Providers[network].getBalance(adminWallet.address)

export const adminSendTransaction = async ({ unsigned, network }) => {
  validateConfig(adminWallet)
  try {
    if (process.env.IMPERSONATE_USERNAME)
      return logger.warn(
        { custom: unsigned },
        'IMPERSONATE_USERNAME tx skipped'
      )
    const adminWalletWithProvider = adminWallet.connect(Web3Providers[network])
    const nonce = await Web3Providers.getTransactionCount(adminWallet.address)
    logger.debug(`Admin wallet nonce for ${network}: ${nonce}`)
    const gasSettings = await getGasSettings({ network })
    return await adminWalletWithProvider.sendTransaction({
      ...unsigned,
      ...gasSettings,
    })
  } catch (e) {
    logger.error(e)
    throw new Error(`adminSendTransaction() ${e}`)
  }
}
