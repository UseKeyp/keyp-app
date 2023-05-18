export const EIP_155_NETWORK_SPEC = [
  { name: 'MAINNET', chainId: 1 },
  { name: 'GOERLI', chainId: 5 },
  { name: 'SEPOLIA', chainId: 11155111 },
  { name: 'MATIC', chainId: 137 },
  { name: 'MUMBAI', chainId: 80001 },
  { name: 'AVALANCHE', chainId: 43114 },
  { name: 'AVALANCHE-FUJI', chainId: 43113 },
  { name: 'ARBITRUM', chainId: 42161 },
  // Not provided by Infura
  { name: 'GNOSIS', chainId: 100 },
  { name: 'OPTIMISM', chainId: 10 },
  { name: 'OPTIMISM-GOERLI', chainId: 420 },
  { name: 'ARBITRUM-NOVA', chainId: 42170 },
  { name: 'MANTLE-WADSLEY', chainId: 5001 },
]

export const getNetworkNameFromId = (chainId) => {
  const network = EIP_155_NETWORK_SPEC.find((item) => item.chainId === chainId)
  if (!network) return { name: 'private', chainId }
  return network
}
export const getIdFromNetworkName = (name) => {
  return EIP_155_NETWORK_SPEC.find((item) => item.name === name.toLowerCase())
    .chainId
}

export const getExplorerBaseUrlFromName = (name) => {
  if (['MAINNET', 'GOERLI', 'SEPOLIA', 'GNOSIS', 'MATIC', 'MUMBAI', 'AVALANCHE', 'AVALANCHE-FUJI', 'ARBITRUM', 'ARBITRUM-NOVA', 'OPTIMISM', 'OPTIMISM-GOERLI', 'MANTLE-WADSLEY'].includes(name)) {
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
