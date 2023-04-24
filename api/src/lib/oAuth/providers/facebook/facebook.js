import crypto from 'crypto'

import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { fetchUser } from 'src/lib/users'

export const FACEBOOK = 'FACEBOOK'
export const FACEBOOK_OAUTH_URL_AUTHORIZE =
  'https://www.facebook.com/v16.0/dialog/oauth'

const FACEBOOK_OAUTH_URL_TOKEN =
  'https://graph.facebook.com/v16.0/oauth/access_token'

const FACEBOOK_SCOPE = 'email public_profile'
const FACEBOOK_REDIRECT_URI = `${APP_DOMAIN}/redirect/facebook`

const responseType = 'code'

const generateCodeVerifier = () => {
  return crypto.randomBytes(32).toString('hex')
}

const generateCodeChallenge = (codeVerifier) => {
  const hash = crypto
    .createHash('sha256')
    .update(codeVerifier, 'ascii')
    .digest('hex')
  return Buffer.from(hash, 'hex')
    .toString('base64')
    .replace('+', '-')
    .replace('/', '_')
    .replace(/=+$/, '')
}

const codeVerifier = generateCodeVerifier()
const codeChallenge = generateCodeChallenge(codeVerifier)
export const params = {
  client_id: process.env.FACEBOOK_CLIENT_ID,
  scope: FACEBOOK_SCOPE,
  redirect_uri: FACEBOOK_REDIRECT_URI,
  response_type: responseType,
  code_challenge: codeChallenge,
  code_challenge_method: 'S256',
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
    if (response?.accessToken) {
      return response.accessToken
    } else {
      logger.error('Failed to get long lived access token')
      return ''
    }
  } catch (error) {
    logger.error('Failed to get long lived access token')
    return ''
  }
}

export const onSubmitCode = async (code) => {
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

    logger.debug({ custom: response }, 'response')

    if (response.error) {
      throw `${response.error} - ${response.error_description}`
    }

    const { access_token: accessToken } = response

    accessToken && logger.debug(`FACEBOOK_API_ACCESS_TOKEN ${accessToken}`)

    const longLivedAccessToken = await getLongLivedAccessToken(accessToken)

    if (longLivedAccessToken) {
      return {
        accessToken: longLivedAccessToken,
      }
    } else {
      return {
        accessToken,
      }
    }
  } catch (e) {
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({ accessToken }) => {
  try {
    const userDetails = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    ).then((res) => res.json())

    logger.debug({ custom: userDetails }, 'userDetails')

    const { id, name, email, picture } = userDetails

    logger.debug({ custom: { id, name, email, picture } }, 'userDetails')

    const user = await fetchUser(id, { username: name }, FACEBOOK)
    logger.debug({ custom: user }, 'user')

    await db.user.update({
      where: { id: user.id },
      data: {
        accessToken,
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
