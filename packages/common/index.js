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
  'REDDIT',
  'FACEBOOK',
  // 'EPIC_GAMES',
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

module.exports.LOGIN_ENABLED_PROVIDERS = LOGIN_ENABLED_PROVIDERS
module.exports.AVAILABLE_NETWORKS = AVAILABLE_NETWORKS
module.exports.getNativeCoinInfo = getNativeCoinInfo
