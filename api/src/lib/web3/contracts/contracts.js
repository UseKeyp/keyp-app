import { EnvelopError } from '@envelop/core'
import { Contract } from '@ethersproject/contracts'

import { logger } from 'src/lib/logger'
import { Web3Providers } from 'src/lib/web3/provider'
import { userSendTransaction } from 'src/lib/web3/wallets'

export const getJuiceBoxContract = ({ address, network }) => {
  // Validate address does not match correct network

  const JB_CONTRACT_ADDRESS = {
    goerli: '0x55d4dfb578daa4d60380995fff7a706471d7c719',
    mainnet: '0x594cb208b5bb48db1bcbc9354d1694998864ec63',
  }
  const jbContractAddress = JB_CONTRACT_ADDRESS[network]
  if (address.toLowerCase() !== jbContractAddress.toLowerCase())
    throw 'Contract address does not match network'

  try {
    return new Contract(
      jbContractAddress,
      [
        'function pay(uint256, uint256, address, address, uint256, bool, string, bytes) external returns (uint256)',
      ],
      Web3Providers[network]
    )
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

export const writeMethod = async ({ user, network, method, args, address }) => {
  if (!user) throw 'No user provided'
  if (!method) throw 'No method provided'
  if (!args) throw 'No arguments provided'
  if (!address) throw 'No address provided'
  if (!network) throw 'No network provided'
  logger.debug(
    `writeMethod() address: ${address}, network: ${network}, method: ${method}, args: ${args}`
  )
  if (method !== 'pay') {
    return pay({ args, network, user })
  } else {
    throw 'Method not yet supported'
  }
}

const pay = async ({ args, network, user, address }) => {
  if (!args) throw 'No arguments provided'
  if (Object.keys(args).length !== 8) throw 'Arguments length mismatch'
  let contract
  try {
    contract = getJuiceBoxContract({ address, network })
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get Juicebox contract')
  }

  try {
    const unsignedTx = await contract.populateTransaction.pay(
      Object.entries(args)
    )
    const tx = await userSendTransaction({
      userId: user.id,
      unsignedTx,
      network,
    })
    return tx
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to call contract method "pay"')
  }
}
