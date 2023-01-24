import fetch from 'cross-fetch'
import { decode as decodeJwt } from 'jsonwebtoken'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import { fetchUser } from 'src/lib/users'

export const GOOGLE = 'GOOGLE'
const GOOGLE_API_DOMAIN = process.env.GOOGLE_API_DOMAIN
const GOOGLE_TOKEN_DOMAIN = process.env.GOOGLE_TOKEN_DOMAIN
const GOOGLE_USER_INFO_DOMAIN = process.env.GOOGLE_USER_INFO_DOMAIN

export const GOOGLE_OAUTH_URL_AUTHORIZE = `${GOOGLE_API_DOMAIN}/auth`

const GOOGLE_OAUTH_URL_TOKEN = `${GOOGLE_TOKEN_DOMAIN}/token`

const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid'
const GOOGLE_REDIRECT_URI = process.env.APP_DOMAIN + '/redirect/google'

const responseType = 'code'
const params = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  scope: GOOGLE_SCOPE,
  redirect_uri: GOOGLE_REDIRECT_URI,
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Referrer-Policy': 'no-referrer-when-downgrade' },
    }).then((res) => {
      if (res.status != 200)
        throw `GOOGLE API failed for /token. Returned ${res.status} - ${res.statusText}`
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
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
      accessTokenExpiration: getExpiration(expiration),
      idToken,
      decoded,
      idTokenExpiration: new Date(decoded.exp * 1000),
    }
  } catch (e) {
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({ accessToken }) => {
  try {
    const userDetails = await fetch(`${GOOGLE_USER_INFO_DOMAIN}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      if (res.status != 200)
        throw 'GOOGLE authorization failed, or secret invalid'
      return res.json()
    })
    logger.debug({ custom: userDetails }, 'User details')

    const user = await fetchUser(
      userDetails.id,
      { email: userDetails.email, accessToken },
      GOOGLE
    )

    await db.user.update({
      where: { id: user.id },
      data: { email: userDetails.email, accessToken },
    })

    return user
  } catch (e) {
    logger.error(e)
    throw `onConnected() ${e}`
  }
}

export const provider = {
  urlAuthorize: GOOGLE_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
