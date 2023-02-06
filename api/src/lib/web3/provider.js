import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'
import { parseUnits } from '@ethersproject/units'

import { logger } from 'src/lib/logger'

export const DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS = parseUnits('2', 'gwei')
export const DEFAULT_GAS_MAX_FEE_PER_GAS = parseUnits('10', 'gwei')

const getProviderByName = (name) => {
  try {
    if (name == 'gnosis') return new JsonRpcProvider(process.env.GNOSIS_RPC)
    if (name == 'matic') return new JsonRpcProvider(process.env.MATIC_RPC)
    if (name == 'mumbai') return new JsonRpcProvider(process.env.MUMBAI_RPC)
    if (name == 'mainnet') return new JsonRpcProvider(process.env.MAINNET_RPC)
    if (name == 'bsc') return new JsonRpcProvider(process.env.BSC_MAINNET_RPC)
    if (name == 'goerli') return new JsonRpcProvider(process.env.GOERLI_RPC)
    if (name == 'bsc-testnet')
      return new JsonRpcProvider(process.env.BSC_TESTNET_RPC)
    return new InfuraProvider(name, process.env.INFURA_ID)
  } catch (error) {
    logger.error(`Error in getProviderByName for network ${name}: ${error}`)
    return null
    // throw new Error(error)
  }
}

export const AVAILABLE_NETWORKS = [
  'gnosis',
  'matic',
  'mumbai',
  'goerli',
  'bsc',
  'bsc-testnet',
  'mainnet',
]

let providers = {}
AVAILABLE_NETWORKS.map((name) => {
  const provider = getProviderByName(name)
  if (provider) providers[name] = provider
})

logger.debug(`Available providers: ${Object.keys(providers)}`)

export const Web3Providers = providers
