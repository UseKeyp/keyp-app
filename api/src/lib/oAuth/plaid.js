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

export const PLAID = 'coinbase'

const PLAID_REDIRECT_URI = process.env.APP_DOMAIN + '/redirect/coinbase'

const createPlaidLink = async () => {
  try {
    const configuration = new Configuration({
      basePath: PlaidEnvironments[isProduction ? 'production' : 'development'],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_CLIENT_SECRET,
        },
      },
    })
    const client = new PlaidApi(configuration)
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
    console.log(createTokenResponse.data)
    return JSON.stringify(createTokenResponse.data)
  } catch (e) {
    throw `createPlaidLink() ${e}`
  }
}

export const getPlaidAccessTokenFromCode = async (
  code,
  { codeVerifier, memberId }
) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.PLAID_CLIENT_ID,
      client_secret: process.env.PLAID_CLIENT_SECRET,
      redirect_uri: PLAID_REDIRECT_URI,
      code,
      code_verifier: codeVerifier,
    }
    const encodedBody = encodeBody(body)
    // console.log(encodedBody.split('&'))
    const response = await fetch(PLAID_OAUTH_URL + '/token', {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      // console.log(res)
      if (res.status != 200)
        throw 'Plaid basic authorization failed, or secret invalid'
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
    } = response

    if (!refreshToken) throw 'Failed to get refresh_token from Plaid'
    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
      memberId,
    }
  } catch (e) {
    throw `getPlaidAccessTokenFromCode() ${e}`
  }
}

export const handlePlaidLogin = async ({
  accessToken,
  refreshToken,
  memberId,
}) => {
  try {
    const userDetails = await fetch('https://api.coinbase.com/v2/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      if (res.status != 200)
        throw 'Plaid authorization failed, or secret invalid'
      return res.json()
    })
    const accounts = await fetch(`https://api.coinbase.com/v2/accounts`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      if (res.status != 200)
        throw 'Plaid authorization failed, or secret invalid'
      return res.json()
    })
    const ethAccount = accounts.data.find(
      (account) => account.currency === 'ETH'
    )
    const addresses = await fetch(
      `https://api.coinbase.com/v2/accounts/${ethAccount.id}/addresses`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    ).then((res) => {
      if (res.status != 200)
        throw 'Plaid authorization failed, or secret invalid'
      return res.json()
    })
    const address = addresses.data[0].address
    await db.member.update({
      where: {
        id: memberId,
      },
      data: {
        coinbaseWithdrawAddress: address.toLowerCase(),
        emailPlaid: userDetails.data.email,
        accessTokenPlaid: accessToken,
        refreshTokenPlaid: refreshToken,
      },
    })
  } catch (e) {
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw new AuthenticationError(e)
  }
}
