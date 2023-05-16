import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const SPOTIFY = 'SPOTIFY'
export const SPOTIFY_OAUTH_URL_AUTHORIZE =
  'https://accounts.spotify.com/authorize'

const SPOTIFY_OAUTH_URL_TOKEN = 'https://accounts.spotify.com/api/token'
const SPOTIFY_REDIRECT_URI = APP_DOMAIN + '/redirect/spotify'
const SPOTIFY_SCOPES = 'user-read-email user-read-private'

const responseType = 'code'
const params = {
  client_id: process.env.SPOTIFY_CLIENT_ID,
  scope: SPOTIFY_SCOPES,
  redirect_uri: SPOTIFY_REDIRECT_URI,
  response_type: responseType,
}

export const onSubmitCode = async (code, { codeVerifier }) => {
  try {
    const body = {
      response_type: 'code',
      grant_type: 'authorization_code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier,
      code,
    }
    const encodedBody = encodeBody(body)
    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      'utf-8'
    ).toString('base64')
    const response = await fetch(SPOTIFY_OAUTH_URL_TOKEN, {
      method: 'POST',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
    }).then((res) => {
      if (res.status != 200) {
        if (res.status === 401)
          throw 'Refresh token no longer valid. User must re-authenticate.'
        throw `Spotify API failed for /token. ${res.status} - ${res.statusText}`
      }
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
    } = response

    if (!refreshToken) throw 'Failed to get refresh_token from Spotify'
    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
    }
  } catch (e) {
    Sentry.captureException(e)
    throw `onSubmitCode() ${e}`
  }
}

export const refreshTokens = async (refreshToken) => {
  try {
    const body = {
      grant_type: 'refresh_token',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      refresh_token: refreshToken,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(SPOTIFY_OAUTH_URL_TOKEN, {
      method: 'POST',
      body: encodedBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((res) => {
      if (res.status == 401)
        throw new Error('Spotify basic authorization failed')
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`
    const {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      expires_in: newExpiration,
    } = response
    if (!newAccessToken || !newRefreshToken)
      throw 'Failed to refresh tokens from Spotify'
    await db.oAuthConnections.update({
      where: { refreshToken },
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiration: getExpiration(newExpiration),
      },
    })
  } catch (e) {
    throw `refreshTokens() ${e}`
  }
}

async function getProfile(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  })

  const data = await response.json()
  return data
}

export const onConnected = async ({
  accessToken,
  accessTokenExpiration,
  refreshToken,
}) => {
  try {
    const userProfile = await getProfile(accessToken)

    /* eslint-disable camelcase */
    const { id, display_name } = userProfile

    /* eslint-disable camelcase */
    const user = await fetchUser(id, { username: display_name }, SPOTIFY)

    let publicAddress
    if (!user.address) {
      try {
        publicAddress = await getTorusPublicAddress(user)
      } catch (e) {
        /* eslint-disable no-console */
        logger.error("Error fetching user's wallet from Torus")
        logger.error(e)
      }
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        ...(publicAddress && { address: publicAddress }),
        email: userProfile.email,
        accessToken,
        accessTokenExpiration,
        refreshToken,
        imageSrc: userProfile.images[0]?.url,
        username: userProfile.display_name,
      },
    })

    return user
  } catch (e) {
    Sentry.captureException(e)
    throw `onConnected() ${e}`
  }
}

export const provider = {
  urlAuthorize: SPOTIFY_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  refreshTokens,
  responseType,
}
