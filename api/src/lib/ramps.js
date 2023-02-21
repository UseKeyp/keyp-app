import { EnvelopError } from '@envelop/core'

import { isProduction } from '@redwoodjs/api/dist/logger'

import { APP_DOMAIN, isProdOrStaging } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { oAuthUrl } from 'src/lib/oAuth'
import { encodeBody } from 'src/lib/oAuth/helpers'
import { COINBASE } from 'src/lib/oAuth/providers/coinbase'
import { userSignMesage } from 'src/lib/web3/wallets'

const MT_PELERIN = 'MT_PELERIN'
const RAMP_NETWORK = 'RAMP_NETWORK'
const WERT = 'WERT'

export const RAMP_DEPOSIT_TYPES_ENABLED = [WERT, MT_PELERIN, RAMP_NETWORK]
export const RAMP_WITHDRAW_TYPES_ENABLED = [COINBASE]

export const getRampOffUrl = async ({ type, user }) => {
  if (!RAMP_WITHDRAW_TYPES_ENABLED.includes(type))
    throw new EnvelopError(
      `Ramp type "${type}" is not supported for withdrawals.`
    )
  const { url } = await oAuthUrl(type, null, user)
  return { url }
}

export const getRampOnUrl = async ({ type, user, network }) => {
  try {
    if (!RAMP_DEPOSIT_TYPES_ENABLED.includes(type))
      throw new EnvelopError(
        `Ramp type "${type}" is not supported for deposits.`
      )
    let url
    const address = user.address
    if (type === MT_PELERIN) {
      const code = Math.floor(Math.random() * 9999)
      const message = `MtPelerin-${code}`
      const signature = await userSignMesage({
        userId: user.id,
        message,
        network,
      })
      const hash = Buffer.from(signature.replace('0x', ''), 'hex').toString(
        'base64'
      )
      url =
        'https://buy.mtpelerin.com/?' +
        encodeBody({
          type: 'web',
          net: 'matic_mainnet',
          nets: 'matic_mainnet',
          bdc: 'USDC',
          crys: 'USDC',
          tabs: 'buy',
          mylogo: `${APP_DOMAIN}/logo.png`,
          primary: '#47433f',
          success: '#0096c6',
          // TODO:  add referral code
          // rfr:""
          addr: address,
          code,
          hash,
        })
    } else if (type === RAMP_NETWORK) {
      let baseUrl = isProdOrStaging
        ? 'https://buy.ramp.network/?'
        : 'https://ri-widget-staging.firebaseapp.com/?'
      url =
        baseUrl +
        encodeBody({
          hostApiKey: isProdOrStaging
            ? ''
            : 'hq9wkss729zojoxkmro64vowbe2zd4jrm3wtsn55',
          hostAppName: 'Keyp',
          userAddress: address,
          hostLogoUrl: `${APP_DOMAIN}/logo.png`,
          enabledFlows: ['ONRAMP'], // Default for hosted mode only.
          userEmailAddress: user.email,
          // swapAsset: 'MATIC_USDC',
          finalUrl: APP_DOMAIN + '/redirect/ramp_network',
        })
    } else if (type === WERT) {
      url = `${APP_DOMAIN}/wert?address=${address}`
    }

    // TODO:  implement database update
    // const { url, reservation, paymentMethod, destCurrency } =
    //   await createDepositReservation(user.address)
    // try {
    //   await db.depositOrder.create({
    //     data: {
    //       paymentType: 'WYRE',
    //       paymentMethod,
    //       reservation,
    //       destCurrency,
    //       member: { connect: { id: user.id } },
    //     },
    //   })
    // } catch (e) {
    //   logger.error(e)
    //   // Do nothing
    // }

    return { url }
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    logger.error(e)
    throw new Error('getRampOnUrl() ', e)
  }
}
