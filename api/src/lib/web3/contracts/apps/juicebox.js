import { EnvelopError } from '@envelop/core'
import { Contract } from '@ethersproject/contracts'

import { logger } from 'src/lib/logger'
import { Web3Providers } from 'src/lib/web3/provider'
import { userSendTransaction } from 'src/lib/web3/wallets'

// NOTE address must be lowercase
const CONTRACT_ADDRESS_GOERLI = '0x55d4dfb578daa4d60380995fff7a706471d7c719'
const CONTRACT_ADDRESS_MAINNET = '0x594cb208b5bb48db1bcbc9354d1694998864ec63'

export const CONTRACT_ADDRESS_BY_NETWORK = {
  goerli: CONTRACT_ADDRESS_GOERLI,
  mainnet: CONTRACT_ADDRESS_MAINNET,
}

const getJuiceBoxContract = ({ address, network }) => {
  if (['goerli', 'mainnet'].indexOf(network) === -1)
    throw 'Invalid network. Only Goerli and Mainnet are supported'
  const jbContractAddress = CONTRACT_ADDRESS_BY_NETWORK[network]
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

const methods = [pay]

export const METHODS_BY_NETWORK = {
  goerli: { [CONTRACT_ADDRESS_GOERLI]: methods },
  mainnet: { [CONTRACT_ADDRESS_MAINNET]: methods },
}
