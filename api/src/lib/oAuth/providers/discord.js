import fetch from 'cross-fetch'
import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import Sentry from 'src/lib/sentry'

import { decode as decodeJwt } from 'jsonwebtoken'

import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import { fetchUser } from 'src/lib/users'
import { getTorusPublicAddress } from 'src/lib/torus/torus'

export const DISCORD = 'DISCORD'
export const DISCORD_OAUTH_URL_AUTHORIZE =
  'https://discord.com/oauth2/authorize'

const DISCORD_OAUTH_URL_TOKEN = 'https://discord.com/api/oauth2/token'
const DISCORD_SCOPE = 'identify email'
const DISCORD_REDIRECT_URI = process.env.APP_DOMAIN + '/redirect/discord'

export const params = {
  client_id: process.env.DISCORD_CLIENT_ID,
  scope: DISCORD_SCOPE,
  redirect_uri: DISCORD_REDIRECT_URI,
}

export const onSubmitCode = async (code, { codeVerifier, userId }) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      redirect_uri: DISCORD_REDIRECT_URI,
      code,
      code_verifier: codeVerifier,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(DISCORD_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((res) => {
      if (res.status == 401)
        throw 'Discord.com basic authorization failed, or secret invalid'
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
      id_token: idToken, // JWT that contains identity information about user
    } = response

    // Use to get your own DISCORD_ACCESS_TOKEN for testing purposes
    accessToken && logger.debug(`DISCORD_API_ACCESS_TOKEN ${accessToken}`)

    if (!response.id_token) throw 'Failed to get id_token from Discord.com'
    const decoded = await decodeJwt(idToken)

    if (new Date() - new Date(decoded.iat * 1000) > 60 * 1000)
      throw 'Discord.com token was not issued recently. It must be <1 minute old.'
    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
      idToken,
      decoded,
      idTokenExpiration: new Date(decoded.exp * 1000),
      userId,
    }
  } catch (e) {
    throw `onSubmitCode() ${e}`
  }
}

export const refreshDiscordTokens = async (refreshToken) => {
  try {
    const body = {
      grant_type: 'refresh_token',
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      refresh_token: refreshToken,
      scope: DISCORD_SCOPE,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(DISCORD_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((res) => {
      if (res.status == 401)
        throw new Error('Discord.com basic authorization failed')
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`
    const {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      expires_in: newExpiration,
      id_token: newIdToken, // JWT that contains identity information about user
    } = response
    if (!newAccessToken || !newRefreshToken || !newIdToken)
      throw 'Failed to refresh tokens from Discord.com'
    const newExpirationDate = getExpiration(newExpiration)
    const decoded = decodeJwt(newIdToken)
    const idTokenExpiration = new Date(decoded.exp * 1000)
    return {
      accessToken: newAccessToken,
      accessTokenExpiration: newExpirationDate,
      refreshToken: newRefreshToken,
      idToken: newIdToken,
      idTokenExpiration,
    }
  } catch (e) {
    throw `refreshDiscordTokens() ${e}`
  }
}

export const onConnected = async ({ refreshToken, accessToken, decoded }) => {
  try {
    if (!decoded) return null
    logger.debug({ custom: decoded }, 'onConnected() decoded')
    const { preferred_username, user_id, email } = decoded
    // Create user if needed, and get current avatar
    const user = await fetchUser(preferred_username, true)
    if (user.banned) {
      throw new AuthenticationError('user is banned')
    }

    if (user_id !== user.id)
      throw new AuthenticationError(
        `user_id in JWT doesn't match player_id from API`
      )

    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
        // NOTE: Updates user with their current avatar and country
        imageSrc: user.imageSrc,
        country: user.country,
      },
    })

    // NOTE: Get Torus wallet address if needed.
    if (!user.address) {
      try {
        const publicAddress = await getTorusPublicAddress(user.id)
        await db.user.update({
          where: { id: user.id },
          data: { address: publicAddress },
        })
      } catch (e) {
        /* eslint-disable no-console */
        console.log("Error fetching user's wallet from Torus")
        console.log(e)
        /* eslint-enable no-console */
      }
    }
    return user
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw `onConnected() error`
  }
}

export const provider = {
  urlAuthorize: DISCORD_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
}
