import { parseUnits } from '@ethersproject/units'
import { AVAILABLE_NETWORKS } from '@usekeyp/common'

export const GAS_SETTINGS_BY_NETWORK = {
  // MAINNET:{},
  POLYGON: {
    INITIAL_DROP_AMOUNT: '0.04',
    DEFAULT_DROP_AMOUNT: '0.025',
    MINIMUM_GAS_DROP_THRESHOLD: '0.019',
    maxFeePerGas: parseUnits('40', 'gwei'),
    maxPriorityFeePerGas: parseUnits('40', 'gwei'),
  },
  // MUMBAI:{},
  // GNOSIS:{},
  // GOERLI:{},
  OPTIMISM: {
    INITIAL_DROP_AMOUNT: '0.00025',
    DEFAULT_DROP_AMOUNT: '0.0015',
    MINIMUM_GAS_DROP_THRESHOLD: '0.00005',
    maxFeePerGas: parseUnits('0.0001', 'gwei'),
    maxPriorityFeePerGas: parseUnits('0.0001', 'gwei'),
  },
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
