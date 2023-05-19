function getNativeCoinInfo(network) {
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

  const abbreviation = NATIVE_COIN_ABBREVIATIONS[network] || 'UNKNOWN';
  const name = NATIVE_COIN_NAMES[network] || 'Unknown Network';

  return {
    symbol: abbreviation,
    name
  };
}

const LOGIN_ENABLED_PROVIDERS = [
  'CHESS',
  'DISCORD',
  'NODE_OIDC',
  'GOOGLE',
  'TWITTER',
  'TWITCH',
  // 'EPIC_GAMES',
  'REDDIT',
]
const AVAILABLE_NETWORKS = [
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

function getExplorerBaseUrlFromName(name) {
  if (
    AVAILABLE_NETWORKS.includes(name)
  ) {
    switch (name) {
      case 'MAINNET':
        return 'https://etherscan.io/'
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
        return `https://snowtrace.io/`
      case 'AVALANCHE-FUJI':
        return `https://testnet.snowtrace.io/`
      case 'ARBITRUM':
        return `https://arbiscan.io/`
      case 'OPTIMISM':
        return `https://optimistic.etherscan.io/`
      case 'OPTIMISM-GOERLI':
        return `https://goerli-optimism.etherscan.io/`
      case 'ARBITRUM-NOVA':
        return `https://explorer.arbitrum.io/`
      case 'MANTLE-WADSLEY':
        return `https://explorer.testnet.mantle.xyz/`
    }
  } else {
    return `https://${name}.etherscan.io/`
  }
}

function getBlockExplorerUrl(name, hash) {
  const baseUrl = getExplorerBaseUrlFromName(name)
  const url = new URL(baseUrl)
  url.pathname = `tx/${hash}`
  return url.toString()
}

module.exports.LOGIN_ENABLED_PROVIDERS = LOGIN_ENABLED_PROVIDERS
module.exports.AVAILABLE_NETWORKS = AVAILABLE_NETWORKS
module.exports.getNativeCoinInfo = getNativeCoinInfo
module.exports.getExplorerBaseUrlFromName = getExplorerBaseUrlFromName
module.exports.getBlockExplorerUrl = getBlockExplorerUrl
