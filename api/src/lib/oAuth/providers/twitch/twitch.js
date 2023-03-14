import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const TWITCH = 'TWITCH'
export const TWITCH_OAUTH_URL_AUTHORIZE =
  'https://id.twitch.tv/oauth2/authorize'

const TWITCH_OAUTH_URL_TOKEN = 'https://id.twitch.tv/oauth2/token'
const TWITCH_OAUTH_URL_REVOKE = 'https://id.twitch.tv/oauth2/revoke'
const TWITCH_SCOPE = 'user:read:email'
const TWITCH_REDIRECT_URI = APP_DOMAIN + '/redirect/twitch'

const responseType = 'code'
const params = {
  client_id: process.env.TWITCH_CLIENT_ID,
  scope: TWITCH_SCOPE,
  redirect_uri: TWITCH_REDIRECT_URI,
  force_verify: true,
}

export const onSubmitCode = async (code, { memberId }) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      redirect_uri: TWITCH_REDIRECT_URI,
      code,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(TWITCH_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (res.status != 200) {
        if (res.status === 401)
          throw 'Refresh token no longer valid. User must re-authenticate.'
        throw `Twitch API failed for /token. ${res.status} - ${res.statusText}`
      }
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`
    logger.debug({ custom: response }, 'Twitch submitCodeGrant')
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
    } = response

    if (!refreshToken) throw 'Failed to get refresh_token from Twitch'
    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
      memberId,
    }
  } catch (e) {
    Sentry.captureException(e)
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({
  accessToken,
  accessTokenExpiration,
  refreshToken,
}) => {
  try {
    const usersList = await fetch(`https://api.twitch.tv/helix/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID,
      },
    }).then((res) => {
      if (res.status != 200)
        throw 'Twitch authorization failed, or secret invalid'
      return res.json()
    })
    logger.debug({ custom: usersList }, 'Twitch user details')

    const username = usersList?.data[0]?.login
    const user = await fetchUser(
      usersList?.data[0]?.id,
      { username: username },
      TWITCH
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
        email: usersList?.data[0]?.email,
        accessToken,
        accessTokenExpiration,
        refreshToken,
        imageSrc: usersList?.data[0]?.profile_image_url,
        username: usersList?.data[0]?.login,
      },
    })

    return user
  } catch (e) {
    Sentry.captureException(e)
    throw `onConnected() ${e}`
  }
}

// Note: there is a potential for this to be generalized for multiple providers
export const refreshTokens = async (refreshToken) => {
  try {
    const body = {
      grant_type: 'refresh_token',
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      refresh_token: refreshToken,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(TWITCH_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((res) => {
      if (res.status == 401)
        throw new Error('Twitch basic authorization failed')
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
      throw 'Failed to refresh tokens from Twitch'
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

const onRevoke = async () => {
  try {
    const member = await db.member.findUnique({
      where: { id: context.currentUser.id },
      include: { oAuthConnections: { where: { revoked: false } } },
    })
    const twitchOAuthConnection = member.oAuthConnections.find(
      (connection) => connection.type === 'TWITCH'
    )
    if (!twitchOAuthConnection) throw 'No OAuth connection found'
    const body = {
      client_id: process.env.TWITCH_CLIENT_ID,
      token: twitchOAuthConnection.accessToken,
    }
    const encodedBody = encodeBody(body)
    logger.debug({ custom: encodedBody }, 'encodedBody')
    logger.debug({ custom: body }, 'body')
    logger.debug({ custom: twitchOAuthConnection }, 'twitchOAuthConnection')
    await fetch(TWITCH_OAUTH_URL_REVOKE, {
      method: 'post',
      body: encodedBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(async (res) => {
      if (res.status != 200) {
        if (res.status === 401) {
          await refreshTokens(twitchOAuthConnection.refreshToken)
          return onRevoke()
        }
        throw `Twitch API failed. ${res.status} - ${res.statusText}`
      }
    })
    await db.member.update({
      where: { id: context.currentUser.id },
      data: { twitchUsername: '' },
    })
    await db.oAuthConnection.update({
      where: { id: twitchOAuthConnection.id },
      data: { revoked: true, accessToken: '', refreshToken: '' },
    })
    return { status: 'SUCCESS' }
  } catch (e) {
    Sentry.captureException(e)
    throw `onRevoke() ${e}`
  }
}

export const provider = {
  urlAuthorize: TWITCH_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  onRevoke,
  responseType,
}
