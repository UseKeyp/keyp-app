/* global URL */

import { Network } from "alchemy-sdk";

export function getAlchemyNetworkEnum(network) {
  switch (network) {
    case 'MAINNET':
      return Network.ETH_MAINNET
    case 'GOERLI':
      return Network.ETH_GOERLI
    case 'SEPOLIA':
      return Network.ETH_SEPOLIA
    case 'OPTIMISM':
      return Network.OPT_MAINNET
    case 'OPTIMISM-GOERLI':
      return Network.OPT_GOERLI
    case 'ARBITRUM':
      return Network.ARB_MAINNET
    case 'ARBITRUM-NOVA':
      return Network.ARB_GOERLI
    case 'POLYGON':
      return Network.MATIC_MAINNET
    case 'MUMBAI':
      return Network.MATIC_MUMBAI
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
}

export function getNativeCoinInfo(network) {
  const NATIVE_COIN_ABBREVIATIONS = {
    MAINNET: 'ETH',
    POLYGON: 'MATIC',
    MUMBAI: 'MATIC',
    GNOSIS: 'xDAI',
    GOERLI: 'ETH',
    OPTIMISM: 'ETH',
    'OPTIMISM-GOERLI': 'ETH',
    ARBITRUM: 'ETH',
    'ARBITRUM-NOVA': 'ETH',
    SEPOLIA: 'ETH',
    AVALANCHE: 'AVAX',
    'AVALANCHE-FUJI': 'AVAX',
  }

  const NATIVE_COIN_NAMES = {
    MAINNET: 'ETH',
    POLYGON: 'MATIC',
    MUMBAI: 'Mumbai MATIC',
    GNOSIS: 'xDAI',
    GOERLI: 'Goerli ETH',
    OPTIMISM: 'Optimism ETH',
    'OPTIMISM-GOERLI': 'Optimism Goerli ETH',
    ARBITRUM: 'Arbitrum ETH',
    'ARBITRUM-NOVA': 'Arbitrum Nova ETH',
    SEPOLIA: 'Sepolia ETH',
    AVALANCHE: 'AVAX',
    'AVALANCHE-FUJI': 'Fuji AVAX',
  }

  const abbreviation = NATIVE_COIN_ABBREVIATIONS[network] || 'UNKNOWN'
  const name = NATIVE_COIN_NAMES[network] || 'Unknown Network'

  return {
    symbol: abbreviation,
    name,
  }
}

export const LOGIN_ENABLED_PROVIDERS = [
  'CHESS',
  'DISCORD',
  'NODE_OIDC',
  'GOOGLE',
  'TWITTER',
  'TWITCH',
  // 'EPIC_GAMES',
  'REDDIT',
  'MICROSOFT',
  'FACEBOOK',
  'SPOTIFY',
]
export const AVAILABLE_NETWORKS = [
  'MAINNET',
  'POLYGON',
  'MUMBAI',
  'GNOSIS',
  'GOERLI',
  'OPTIMISM',
  'OPTIMISM-GOERLI',
  'ARBITRUM',
  'ARBITRUM-NOVA',
  'SEPOLIA',
  'AVALANCHE',
  'AVALANCHE-FUJI',
  'MANTLE-WADSLEY',
]

export function getExplorerBaseUrlFromName(name) {
  if (AVAILABLE_NETWORKS.includes(name)) {
    switch (name) {
      case 'MAINNET':
        return 'https://etherscan.io/'
      case 'POLYGON':
        return 'https://polygonscan.com/'
      case 'GOERLI':
        return `https://goerli.etherscan.io/`
      case 'SEPOLIA':
        return `https://sepolia.etherscan.io/`
      case 'GNOSIS':
        return `https://blockscout.com/xdai/mainnet/`
      case 'MATIC':
        return `https://polygonscan.com/`
      case 'MUMBAI':
        return `https://mumbai.polygonscan.com/`
      case 'AVALANCHE':
        return `https://avascan.info/` // not working but on https://avascan.info/blockchain/dfk/
      case 'AVALANCHE-FUJI':
        return `https://testnet.snowtrace.io/`
      case 'ARBITRUM':
        return `https://arbiscan.io/`
      case 'OPTIMISM':
        return `https://optimistic.etherscan.io/`
      case 'OPTIMISM-GOERLI':
        return `https://goerli-optimism.etherscan.io/`
      case 'ARBITRUM-NOVA':
        return `https://testnet.arbiscan.io/`
      case 'MANTLE-WADSLEY':
        return `https://explorer.testnet.mantle.xyz/`
    }
  } else {
    return `https://${name}.etherscan.io/`
  }
}

export function getBlockExplorerUrl(name, hash) {
  const baseUrl = getExplorerBaseUrlFromName(name)
  const url = new URL('tx/' + hash, baseUrl)
  return url.toString()
}
