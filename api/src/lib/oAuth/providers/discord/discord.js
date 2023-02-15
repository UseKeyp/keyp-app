import fetch from 'cross-fetch'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { fetchDiscord } from 'src/lib/discord'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const DISCORD = 'DISCORD'
export const DISCORD_OAUTH_URL_AUTHORIZE =
  'https://discord.com/oauth2/authorize'

const DISCORD_OAUTH_URL_TOKEN = 'https://discord.com/api/oauth2/token'
const DISCORD_SCOPE = 'identify email'
const DISCORD_REDIRECT_URI = APP_DOMAIN + '/redirect/discord'

const responseType = 'code'
export const params = {
  client_id: process.env.DISCORD_CLIENT_ID,
  scope: DISCORD_SCOPE,
  redirect_uri: DISCORD_REDIRECT_URI,
}

export const onSubmitCode = async (code, { codeVerifier }) => {
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
    } = response

    // Use to get your own DISCORD_ACCESS_TOKEN for testing purposes
    accessToken && logger.debug(`DISCORD_API_ACCESS_TOKEN ${accessToken}`)

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
    // TODO: fetch user details
    const userDetails = await fetchDiscord({ path: `users/@me`, accessToken })
    logger.debug({ custom: userDetails }, 'userDetails')
    if (!userDetails.verified)
      throw new AuthenticationError(
        `Verify your email with Discord and try again.`
      )

    // eslint-disable-next-line camelcase
    const { id, username, locale, avatar, mfa_enabled, email } = userDetails

    // Create user if needed, and get current avatar
    const user = await fetchUser(id, { username }, DISCORD)
    if (user.banned) {
      throw new AuthenticationError('user is banned')
    }
    logger.debug({ custom: user }, 'user')

    const imageSrc = avatar
      ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
      : null

    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
        accessToken,
        // NOTE: Updates current avatar and locale
        email,
        imageSrc: imageSrc,
        locale,
        // eslint-disable-next-line camelcase
        mfa_enabled,
      },
    })

    // NOTE: Get Torus wallet address if needed.
    // Don't place this in users.js (spam wallet generation prevention)
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

export const refreshDiscordTokens = async (userId) => {
  try {
    const { refreshToken } = await db.user.findUnique({ where: { id: userId } })

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
        throw new Error(
          'Discord.com basic authorization failed for /token endpoint'
        )
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
      throw 'Failed to refresh tokens from Discord.com'

    const newExpirationDate = getExpiration(newExpiration)

    await db.user.update({
      where: { id: userId },
      data: {
        accessToken: newAccessToken,
        accessTokenExpiration: newExpirationDate,
        refreshToken: newRefreshToken,
      },
    })
    return {
      accessToken: newAccessToken,
      accessTokenExpiration: newExpirationDate,
      refreshToken: newRefreshToken,
    }
  } catch (e) {
    throw `refreshDiscordTokens() ${e}`
  }
}

export const provider = {
  urlAuthorize: DISCORD_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
