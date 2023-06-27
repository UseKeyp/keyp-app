import { parseUnits } from '@ethersproject/units'
import fetch from 'cross-fetch'

import { logger } from 'src/lib/logger'
import { gasConfigByNetwork } from 'src/lib/web3/airdrop/gasConfig'

const cheerio = require('cheerio')

export const getGasSettings = async ({ network }) => {
  const GAS_CONFIG = gasConfigByNetwork({ network })

  let { maxFeePerGas, maxPriorityFeePerGas } = GAS_CONFIG

  if (network === 'POLYGON') {
    try {
      const body = await fetch('https://polygonscan.com/gastracker').then(
        (res) => {
          return res.text()
        }
      )
      const $ = cheerio.load(body)
      const elementData = $(`#standardgas`).text()
      const rawString = elementData.split(' ')[0]
      maxFeePerGas = parseUnits(rawString, 'gwei')
    } catch (e) {
      // ignore
      logger.warn(`Can't get gas settings for ${network}`)
      logger.warn(e)
    }
  }

  return { maxFeePerGas, maxPriorityFeePerGas }
}
