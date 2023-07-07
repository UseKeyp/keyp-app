import { getAlchemyNetworkEnum } from '@usekeyp/common'
import { Alchemy } from 'alchemy-sdk'
import { BigNumber } from 'alchemy-sdk'
import axios from 'axios'

import { logger } from 'src/lib/logger'
import { DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS } from 'src/lib/web3/provider'

export const getGasSettings = async ({ network }) => {
  let alchemyNetwork
  try {
    alchemyNetwork = getAlchemyNetworkEnum(network)
  } catch (e) {
    logger.debug(`getGasSettings() - no Alchemy network found for ${network}`)
  }
  let maxFeePerGas
  let maxPriorityFeePerGas

  // Use Alchemy first, if available for the network
  if (alchemyNetwork) {
    try {
      const settings = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: getAlchemyNetworkEnum(network),
      }
      const alchemy = new Alchemy(settings)
      let gasPrice = await alchemy.core.getGasPrice()
      maxFeePerGas = gasPrice
      maxPriorityFeePerGas = gasPrice
    } catch (e) {
      logger.error(`Can't get gas settings from Alchemy for ${network}`)
      logger.error(e)
    }
  }

  // Using Infura for Avalanche and Avalanche-Fuji
  if (network === 'AVALANCHE' || network === 'AVALANCHE-FUJI') {
    try {
      if (network === 'AVALANCHE') {
        axios
          .post(
            `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
            {
              jsonrpc: '2.0',
              id: 1,
              method: 'eth_gasPrice',
              params: [],
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .then(
            (response) => {
              maxFeePerGas = response.data.result
              maxPriorityFeePerGas = response.data.result
            },
            (error) => {
              logger.error(`Can't get gas settings from Infura for ${network}`)
              logger.error(error)
            }
          )
      } else {
        axios
          .post(
            `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_API_KEY}`,
            {
              jsonrpc: '2.0',
              id: 1,
              method: 'eth_gasPrice',
              params: [],
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .then(
            (response) => {
              maxFeePerGas = response.data.result
              maxPriorityFeePerGas = response.data.result
            },
            (error) => {
              logger.error(`Can't get gas settings from Infura for ${network}`)
              logger.error(error)
            }
          )
      }
    } catch (e) {
      logger.error(`Can't get gas settings from Infura for ${network}`)
      logger.error(e)
    }
  }

  // Gnosis
  if (network === 'GNOSIS') {
    try {
      let response = await axios.get(
        'https://api.gnosisscan.io/api?module=proxy&action=eth_gasPrice'
      )
      let gasPrice = response.data.result
      maxFeePerGas = BigNumber.from(gasPrice)
      maxPriorityFeePerGas = maxFeePerGas
    } catch (e) {
      logger.error(`Can't get gas settings for Gnosis`)
      logger.error(e)
    }
  }

  if (!maxFeePerGas || !maxPriorityFeePerGas) {
    maxFeePerGas = DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS
    maxPriorityFeePerGas = DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS
  }

  return { maxFeePerGas, maxPriorityFeePerGas }
}
