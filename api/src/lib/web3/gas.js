import { parseUnits } from '@ethersproject/units'
import fetch from 'cross-fetch'

import { logger } from 'src/lib/logger'
import { gasConfigByNetwork } from 'src/lib/web3/airdrop/gasConfig'

const GAS_STATION_URLS = {
  POLYGON: 'https://gasstation-mainnet.matic.network/v2',
  MUMBAI: 'https://gasstation-mumbai.matic.today/v2',
}

export const getGasSettings = async ({ network }) => {
  const GAS_CONFIG = gasConfigByNetwork({ network })

  let { maxFeePerGas, maxPriorityFeePerGas } = GAS_CONFIG

  if (GAS_STATION_URLS[network]) {
    try {
      const res = await fetch(GAS_STATION_URLS[network]).then((res) => {
        return res.json()
      })
      if (!res?.fast?.maxFee)
        return logger.error(`Can't get gas settings for ${network}`)
      maxFeePerGas = parseUnits(Math.ceil(res.fast.maxFee) + '', 'gwei')
      maxPriorityFeePerGas = parseUnits(
        Math.ceil(res.fast.maxPriorityFee) + '',
        'gwei'
      )
    } catch (e) {
      // ignore
      logger.warn(`Can't get gas settings for ${network}`)
      logger.warn(e)
    }
  }

  return { maxFeePerGas, maxPriorityFeePerGas }
}
