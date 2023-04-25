import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { getExpiration } from 'src/lib/oAuth/helpers'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const FACEBOOK = 'FACEBOOK'
export const FACEBOOK_OAUTH_URL_AUTHORIZE =
  'https://www.facebook.com/v16.0/dialog/oauth'

const FACEBOOK_OAUTH_URL_TOKEN =
  'https://graph.facebook.com/v16.0/oauth/access_token'

const FACEBOOK_SCOPE = 'email public_profile'
const FACEBOOK_REDIRECT_URI = `${APP_DOMAIN}/redirect/facebook`

const responseType = 'code'

export const params = {
  client_id: process.env.FACEBOOK_CLIENT_ID,
  scope: FACEBOOK_SCOPE,
  redirect_uri: FACEBOOK_REDIRECT_URI,
  response_type: responseType,
}

async function getLongLivedAccessToken(accessToken) {
  try {
    const response = await fetch(
      `${FACEBOOK_OAUTH_URL_TOKEN}?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${accessToken}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    ).then((res) => res.json())
    if (response?.access_token) {
      return {
        access_token: response.access_token,
        expires_in: response.expires_in,
      }
    } else {
      logger.error('Failed to get long lived access token')
      return ''
    }
  } catch (error) {
    logger.error('Failed to get long lived access token')
    return ''
  }
}

export const onSubmitCode = async (code, { codeVerifier }) => {
  try {
    const response = await fetch(
      `${FACEBOOK_OAUTH_URL_TOKEN}?client_id=${
        process.env.FACEBOOK_CLIENT_ID
      }&redirect_uri=${encodeURIComponent(
        FACEBOOK_REDIRECT_URI
      )}&client_secret=${
        process.env.FACEBOOK_CLIENT_SECRET
      }&code=${code}&code_verifier=${codeVerifier}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    ).then((res) => res.json())

    if (response.error) {
      throw `${response.error} - ${response.error_description}`
    }

    const { access_token: accessToken, expires_in: expiration } = response

    const longLivedAccessToken = await getLongLivedAccessToken(accessToken)

    if (longLivedAccessToken) {
      const { access_token: accessToken, expires_in: expiration } =
        longLivedAccessToken
      return {
        accessToken: accessToken,
        accessTokenExpiration: getExpiration(expiration),
      }
    } else {
      return {
        accessToken,
        accessTokenExpiration: getExpiration(expiration),
      }
    }
  } catch (e) {
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({ accessTokenExpiration, accessToken }) => {
  try {
    const userDetails = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    ).then((res) => res.json())

    const { id, name, email, picture } = userDetails

    const user = await fetchUser(id, { username: name }, FACEBOOK)

    let publicAddress
    if (!user.address) {
      try {
        publicAddress = await getTorusPublicAddress(user)
      } catch (e) {
        /* eslint-disable no-console */
        logger.error("Error fetching user's wallet from Torus")
        logger.error(e)
        /* eslint-enable no-console */
      }
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        ...(publicAddress && { address: publicAddress }),
        accessToken,
        accessTokenExpiration,
        username: name,
        imageSrc: picture?.data?.url,
        email,
      },
    })

    return user
  } catch (e) {
    Sentry.captureException(e)
    throw `onConnected() error`
  }
}

export const provider = {
  urlAuthorize: FACEBOOK_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
