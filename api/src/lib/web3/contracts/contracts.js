import { Contract } from '@ethersproject/contracts'

import { logger } from 'src/lib/logger'
import { Web3Providers } from 'src/lib/web3/provider'
import { userSendTransaction } from 'src/lib/web3/wallets'

export const writeMethod = async (input) => {
  const { user, network, abi, args, address } = input

  if (!user) throw 'No user provided'
  if (!args) throw 'No arguments provided'
  if (!abi) throw 'No abi provided'
  if (!address) throw 'No address provided'
  if (!network) throw 'No network provided'

  const method = abi.split('(')[0]
  logger.debug(
    `writeMethod() address: ${address}, network: ${network}, method: ${method}, args: ${JSON.stringify(
      args
    )}`
  )

  const contract = new Contract(
    address,
    [`function ${abi}`],
    Web3Providers[network]
  )

  const unsignedTx = await contract.populateTransaction[method](...args)
  const tx = await userSendTransaction({
    user: user,
    unsignedTx,
    network,
  })
  return tx
}
