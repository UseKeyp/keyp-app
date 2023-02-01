import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import { fetchUser } from 'src/lib/users'

export const TWITTER = 'TWITTER'
export const TWITTER_OAUTH_URL_AUTHORIZE = `https://twitter.com/i/oauth2/authorize`

const TWITTER_OAUTH_URL_TOKEN = `https://api.twitter.com/2/oauth2/token`

const TWITTER_SCOPE = 'tweet.read users.read offline.access'
const TWITTER_REDIRECT_URI = APP_DOMAIN + '/redirect/twitter'

const responseType = 'code'
const params = {
  client_id: process.env.TWITTER_CLIENT_ID,
  scope: TWITTER_SCOPE,
  redirect_uri: TWITTER_REDIRECT_URI,
}
export const onSubmitCode = async (code, { codeVerifier }) => {
  try {
    const body = {
      response_type: 'code',
      grant_type: 'authorization_code',
      client_id: process.env.TWITTER_CLIENT_ID,
      client_secret: process.env.TWITTER_CLIENT_SECRET,
      redirect_uri: TWITTER_REDIRECT_URI,
      code_verifier: codeVerifier,
      code,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(TWITTER_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: {
        Authorization: `Basic ${process.env.REDWOOD_ENV_TWITTER_BASIC_SECRET}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (res.status != 200)
        throw `TWITTER API failed for /token. Returned ${res.status} - ${res.statusText}`
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      access_token: accessToken,
      expires_in: expiration,
      refresh_token: refreshToken,
    } = response

    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
    }
  } catch (e) {
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({ refreshToken, accessToken }) => {
  try {
    const userDetails = await fetch(`https://api.twitter.com/2/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      if (res.status != 200)
        throw 'TWITTER authorization failed, or secret invalid'
      return res.json()
    })

    const { id, username } = userDetails.data

    const user = await fetchUser(id, { username }, TWITTER)

    await db.user.update({
      where: { id: user.id },
      data: { refreshToken, accessToken },
    })

    return user
  } catch (e) {
    logger.error(e)
    throw `onConnected() ${e}`
  }
}

export const provider = {
  urlAuthorize: TWITTER_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
