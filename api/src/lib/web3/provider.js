import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'
import { parseUnits } from '@ethersproject/units'
import { AVAILABLE_NETWORKS } from '@usekeyp/common'

import { logger } from 'src/lib/logger'

export const DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS = parseUnits('2', 'gwei')
export const DEFAULT_GAS_MAX_FEE_PER_GAS = parseUnits('10', 'gwei')

const RPC_BY_NAME = {
  mainnet: process.env.RPC_MAINNET,
  polygon: process.env.RPC_POLYGON,
  mumbai: process.env.RPC_MUMBAI,
  gnosis: process.env.RPC_GNOSIS,
  goerli: process.env.RPC_GOERLI,
  optimism: process.env.RPC_OPTIMISM,
  'optimism-goerli': process.env.RPC_OPTIMISM_GOERLI,
  arbitrum: process.env.RPC_ARBITRUM,
  'arbitrum-nova': process.env.RPC_ARBITRUM_NOVA,
  sepolia: process.env.RPC_SEPOLIA,
  avalanche: process.env.RPC_AVALANCHE,
  'avalanche-fuji': process.env.RPC_AVALANCHE_FUJI,
}

const getProviderByName = (name) => {
  try {
    let provider
    if (name == 'mainnet') {
      provider = new InfuraProvider(name, process.env.INFURA_ID)
    } else {
      provider = new JsonRpcProvider(RPC_BY_NAME[name])
    }
    if (provider.connection.url === 'http://localhost:8545')
      throw 'No RPC URL provided'
    return provider
  } catch (error) {
    logger.error(`Error getting web3 provider for ${name}: ${error}`)
    return null
    // throw new Error(error)
  }
}

let providers = {}
AVAILABLE_NETWORKS.map((name) => {
  const provider = getProviderByName(name)
  if (provider) providers[name] = provider
})

logger.debug(`Available providers: ${Object.keys(providers)}`)

export const Web3Providers = providers
