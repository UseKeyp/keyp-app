import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from 'plaid'

import { isProduction } from 'src/lib/helpers'
import fetch from 'cross-fetch'
import { db } from 'src/lib/db'
import Sentry from 'src/lib/sentry'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'

export const WYRE = 'wyre'
export const PLAID = 'plaid'

const PLAID_REDIRECT_URI = 'https://0.0.0.0:8910/redirect/plaid'
// const PLAID_REDIRECT_URI = process.env.APP_DOMAIN + '/redirect/coinbase'

const configuration = new Configuration({
  basePath: PlaidEnvironments[isProduction ? 'production' : 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_CLIENT_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
})
const client = new PlaidApi(configuration)

export const createPlaidLink = async () => {
  try {
    const request = {
      user: { client_user_id: context.currentUser.id },
      client_name: 'Treasure Chess',
      products: [Products.Auth],
      language: 'en',
      webhook: 'https://webhook.example.com',
      redirect_uri: PLAID_REDIRECT_URI,
      country_codes: [CountryCode.Us],
    }
    const createTokenResponse = await client.linkTokenCreate(request)
    if (!createTokenResponse?.data?.link_token) throw 'No link token returned'
    return createTokenResponse.data.link_token
  } catch (e) {
    console.log(e)
    throw `createPlaidLink() ${e}`
  }
}

export const handlePlaidConnection = async ({ code, accountId }) => {
  try {
    console.log(code, accountId)
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: code,
    })
    const accessToken = tokenResponse.access_token
    // Create a processor token for a specific account id.
    const request = {
      access_token: accessToken,
      account_id: accountId,
      processor: 'wyre',
    }

    const processorTokenResponse = await client.createProcessorToken(request)

    const processorToken = processorTokenResponse.processor_token
    // pass processor_token to wyre
  } catch (e) {
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw new AuthenticationError(e)
  }
}
