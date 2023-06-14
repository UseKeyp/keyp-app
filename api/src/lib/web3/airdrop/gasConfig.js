import { AVAILABLE_NETWORKS } from '@usekeyp/common'

export const GAS_SETTINGS_BY_NETWORK = {
  // MAINNET:{},
  POLYGON: {
    INITIAL_DROP_AMOUNT: '0.04',
    DEFAULT_DROP_AMOUNT: '0.025',
    MINIMUM_GAS_THRESHOLD: '0.019',
  },
  // MUMBAI:{},
  // GNOSIS:{},
  // GOERLI:{},
  // OPTIMISM:{},
  // OPTIMISM-GOERLI:{},
  // ARBITRUM:{},
  // ARBITRUM-NOVA:{},
  // SEPOLIA:{},
  // AVALANCHE:{},
  // AVALANCHE-FUJI:{},
  // MANTLE-WADSLEY:{},
}

const showMissingGasConfigWarning = () => {
  AVAILABLE_NETWORKS.map((networkName) => {
    if (!Object.keys(GAS_SETTINGS_BY_NETWORK).includes(networkName))
      console.log(
        `WARNING: Gas is not configured for ${networkName}. Using default settings from Polygon.`
      )
  })
}

showMissingGasConfigWarning()
