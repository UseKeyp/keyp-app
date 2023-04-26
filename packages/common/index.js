const LOGIN_ENABLED_PROVIDERS = [
  'CHESS',
  'DISCORD',
  'NODE_OIDC',
  'GOOGLE',
  'TWITTER',
  'TWITCH',
  'EPIC_GAMES',
  'REDDIT'
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
]

function getNativeTokenAbbreviation(network) {
  const NATIVE_TOKEN_ABBREVIATIONS = {
    MAINNET: 'ETH',
    POLYGON: 'MATIC',
    MUMBAI: 'MATIC',
    GNOSIS: 'ETH',
    GOERLI: 'ETH',
    OPTIMISM: 'ETH',
    'OPTIMISM-GOERLI': 'ETH',
    ARBITRUM: 'ETH',
    'ARBITRUM-NOVA': 'ETH',
    SEPOLIA: 'ETH',
    AVALANCHE: 'AVAX',
    'AVALANCHE-FUJI': 'AVAX',
  }
  return NATIVE_TOKEN_ABBREVIATIONS[network] || 'UNKNOWN';
}


module.exports.LOGIN_ENABLED_PROVIDERS = LOGIN_ENABLED_PROVIDERS
module.exports.AVAILABLE_NETWORKS = AVAILABLE_NETWORKS
module.exports.getNativeTokenAbbreviation = getNativeTokenAbbreviation
