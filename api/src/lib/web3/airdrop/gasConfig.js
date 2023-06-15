import { parseUnits } from '@ethersproject/units'
import { AVAILABLE_NETWORKS } from '@usekeyp/common'

const GAS_SETTINGS_BY_NETWORK = {
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
    DEFAULT_DROP_AMOUNT: '0.00015',
    MINIMUM_GAS_DROP_THRESHOLD: '0.00005',
    maxFeePerGas: parseUnits('0.005', 'gwei'),
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

export const gasConfigByNetwork = ({ network }) => {
  let config = GAS_SETTINGS_BY_NETWORK[network]
  if (!config) config = GAS_SETTINGS_BY_NETWORK.POLYGON
  return config
}

const showMissingGasConfigWarning = () => {
  AVAILABLE_NETWORKS.map((networkName) => {
    if (!Object.keys(GAS_SETTINGS_BY_NETWORK).includes(networkName))
      /* eslint-disable-next-line no-console */
      console.log(
        `WARNING: Gas not configured for ${networkName}. Using default config for POLYGON.`
      )
  })
}

showMissingGasConfigWarning()
