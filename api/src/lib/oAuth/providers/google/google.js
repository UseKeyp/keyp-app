import fetch from 'cross-fetch'
import { decode as decodeJwt } from 'jsonwebtoken'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const GOOGLE = 'GOOGLE'
export const GOOGLE_OAUTH_URL_AUTHORIZE = `https://accounts.google.com/o/oauth2/auth`

const GOOGLE_OAUTH_URL_TOKEN = `https://oauth2.googleapis.com/token`

const GOOGLE_SCOPE = 'email profile openid'
const GOOGLE_REDIRECT_URI = APP_DOMAIN + '/redirect/google'

const responseType = 'code'
const params = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  scope: GOOGLE_SCOPE,
  redirect_uri: GOOGLE_REDIRECT_URI,
  access_type: 'offline',
  prompt: 'consent', // Required to get refresh_token. https://github.com/googleapis/google-auth-library-nodejs#obtaining-a-new-refresh-token
}

export const onSubmitCode = async (code, { codeVerifier }) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      code_verifier: codeVerifier,
      code,
    }
    const encodedBody = encodeBody(body)
    logger.debug({ custom: body }, '/token request body')
    const response = await fetch(GOOGLE_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
    }).then((res) => {
      if (res.status != 200)
        throw `GOOGLE API failed for /token. Returned ${res.status} - ${res.statusText}`
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      refresh_token: refreshToken,
      access_token: accessToken,
      expires_in: expiration,
      id_token: idToken,
    } = response

    if (!response.id_token) throw 'Failed to get id_token'
    const decoded = await decodeJwt(idToken)

    logger.debug({ custom: decoded }, 'decoded id_token')

    if (new Date() - new Date(decoded.iat * 1000) > 60 * 1000)
      throw 'id_token was not issued recently. It must be <1 minute old.'

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: getExpiration(expiration),
      idToken,
      decoded,
      idTokenExpiration: new Date(decoded.exp * 1000),
    }
  } catch (e) {
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({ refreshToken, accessToken, decoded }) => {
  try {
    if (!decoded.email_verified || !decoded.email)
      throw new AuthenticationError(
        `Verify your email with Google and try again.`
      )

    const user = await fetchUser(
      decoded.sub,
      { email: decoded.email, accessToken },
      GOOGLE
    )

    let publicAddress
    if (!user.address) {
      try {
        publicAddress = await getTorusPublicAddress(user.id)
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
        email: decoded.email,
        accessToken,
        refreshToken,
        imageSrc: decoded.picture,
        locale: decoded.locale,
        username: decoded.email,
      },
    })

    return user
  } catch (e) {
    logger.error(e)
    throw `onConnected() ${e}`
  }
}

export const refreshGoogleTokens = async (userId) => {
  try {
    const { refreshToken } = await db.user.findUnique({ where: { id: userId } })
    const body = {
      grant_type: 'refresh_token',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      scope: GOOGLE_SCOPE,
      redirect_uri: GOOGLE_REDIRECT_URI,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(GOOGLE_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((res) => {
      if (res.status == 401)
        throw new Error('Google basic authorization failed for /token endpoint')
      return res.json()
    })
    if (response.error)
      throw `${response.error} ${
        response.hint ? `- ${response.hint}. ${response.message}` : ''
      }`

    const {
      access_token: newAccessToken,
      expires_in: newExpiration,
      id_token: newIdToken,
    } = response
    if (!newAccessToken) throw 'Failed to refresh tokens from Google'

    const newExpirationDate = getExpiration(newExpiration)

    await db.user.update({
      where: { id: userId },
      data: {
        accessToken: newAccessToken,
        accessTokenExpiration: newExpirationDate,
      },
    })
    return {
      accessToken: newAccessToken,
      accessTokenExpiration: newExpirationDate,
      idToken: newIdToken,
    }
  } catch (e) {
    logger.error(e)
    throw `refreshGoogleTokens() ${e}`
  }
}

export const provider = {
  urlAuthorize: GOOGLE_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
