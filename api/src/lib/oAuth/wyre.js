import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from 'plaid'

import { isProduction } from 'src/lib/helpers'
import fetch from 'cross-fetch'
import { createPaymentMethod } from 'src/lib/wyre'
import { db } from 'src/lib/db'
import Sentry from 'src/lib/sentry'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'

export const WYRE = 'wyre'
export const PLAID = 'plaid'

// TODO: Change this back
const PLAID_REDIRECT_URI = 'https://0.0.0.0:8910/redirect/plaid'
// const PLAID_REDIRECT_URI = process.env.APP_DOMAIN + '/redirect/coinbase'
const PLAID_WEBHOOKS_URL = process.env.APP_DOMAIN + '/api/plaid'

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
const PRODUCTS_SCOPE = [Products.Auth, Products.Identity]

export const createPlaidLink = async () => {
  try {
    const request = {
      user: { client_user_id: context.currentUser.id },
      client_name: 'Treasure Chess',
      products: PRODUCTS_SCOPE,
      language: 'en', // TODO get from user's account
      webhook: PLAID_WEBHOOKS_URL,
      redirect_uri: PLAID_REDIRECT_URI,
      country_codes: [CountryCode.Us], // TODO: How do we know this?
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
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: code,
    })
    const accessToken = tokenResponse.data.access_token
    // Create a processor token for a specific account id.
    const request = {
      access_token: accessToken,
      account_id: accountId,
      processor: 'wyre',
    }

    const processorTokenResponse = await client.processorTokenCreate(request)

    const processorToken = processorTokenResponse.data.processor_token
    console.log(processorToken)
    // Get the account country needed for wyre
    const { data: accountsResponse } = await client.accountsGet({
      access_token: accessToken,
    })
    const account = accountsResponse.accounts.find(
      (account) =>
        account.type === 'depository' &&
        ['checking', 'savings'].includes(account.subtype)
    )
    if (!account)
      throw 'No account found matching the criteria - checking or savings'
    const accountNickname = `${account.name} - ${account.subtype}`
    console.log(account)
    console.log(accountNickname)
    // TODO: get actual country
    const country = 'US'
    const paymentId = await createPaymentMethod({ processorToken, country })
    // pass processor_token to wyre
  } catch (e) {
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw e
  }
}

// Used for testing purposes only in "sandbox" environment
export const getSandboxPublicToken = async () => {
  try {
    const publicTokenRequest = {
      institution_id: 'ins_132241',
      initial_products: PRODUCTS_SCOPE,
    }
    const publicTokenResponse = await client.sandboxPublicTokenCreate(
      publicTokenRequest
    )
    const publicToken = publicTokenResponse.data.public_token
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: publicToken,
    })
    const accessToken = tokenResponse.data.access_token
    const { data: accountsResponse } = await client.accountsGet({
      access_token: accessToken,
    })
    const account = accountsResponse.accounts.find(
      (account) =>
        account.type === 'depository' &&
        ['checking', 'savings'].includes(account.subtype)
    )
    return { accountId: account.account_id, code: publicToken }
  } catch (e) {
    console.log(e)
  }
}
