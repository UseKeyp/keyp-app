import { parseUnits } from '@ethersproject/units'
import fetch from 'cross-fetch'

import { isProduction } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'

export const getGasSettings = async ({ network }) => {
  let maxFeePerGas = parseUnits('40', 'gwei') // fallback to 40 gwei
  let maxPriorityFeePerGas = parseUnits('40', 'gwei') // fallback to 40 gwei
  try {
    const res = await fetch(
      isProduction
        ? 'https://gasstation-mainnet.matic.network/v2'
        : 'https://gasstation-mumbai.matic.today/v2'
    ).then((res) => {
      return res.json()
    })
    if (!res?.fast?.maxFee)
      return logger.error(`Can't get gas settings for ${network}`)
    // logger.debug({ custom: res }, 'gasstation response')
    maxFeePerGas = parseUnits(Math.ceil(res.fast.maxFee) + '', 'gwei')
    maxPriorityFeePerGas = parseUnits(
      Math.ceil(res.fast.maxPriorityFee) + '',
      'gwei'
    )
  } catch (e) {
    // ignore
    logger.error(`Can't get gas settings for ${network}`)
    logger.error(e)
  }
  return { maxFeePerGas, maxPriorityFeePerGas }
}
