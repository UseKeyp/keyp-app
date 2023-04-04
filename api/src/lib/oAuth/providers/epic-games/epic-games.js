import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const EPIC_GAMES = 'EPIC_GAMES'

const EPIC_GAMES_OAUTH_URL_TOKEN =
  'https://api.epicgames.dev/epic/oauth/v1/token'
const EPIC_GAMES_SCOPE = 'basic_profile'
const EPIC_GAMES_REDIRECT_URI = APP_DOMAIN + '/redirect/epic_games'

const EPIC_GAMES_CLIENT_ID = process.env.EPIC_GAMES_CLIENT_ID

export const EPIC_GAMES_OAUTH_URL_AUTHORIZE = `https://www.epicgames.com/id/authorize?client_id=${EPIC_GAMES_CLIENT_ID}&redirect_uri=${EPIC_GAMES_REDIRECT_URI}&response_type=code&scope=${EPIC_GAMES_SCOPE}`

const responseType = 'code'
const params = {
  client_id: EPIC_GAMES_CLIENT_ID,
  scope: EPIC_GAMES_SCOPE,
  redirect_uri: EPIC_GAMES_REDIRECT_URI,
  prompt: 'none',
}

const EPIC_GAMES_BASIC_AUTH = Buffer.from(
  EPIC_GAMES_CLIENT_ID + ':' + process.env.EPIC_GAMES_CLIENT_SECRET
).toString('base64')

const onSubmitCode = async (code, { codeVerifier, memberId }) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.EPIC_GAMES_CLIENT_ID,
      client_secret: process.env.EPIC_GAMES_CLIENT_SECRET,
      redirect_uri: EPIC_GAMES_REDIRECT_URI,
      code,
      code_verifier: codeVerifier,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(EPIC_GAMES_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Basic auth required for api.epicgames.dev
        Authorization: `Basic ${EPIC_GAMES_BASIC_AUTH}`,
      },
    }).then((res) => {
      if (res.status == 401)
        throw 'Epic Games basic authorization failed, or secret invalid'
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
      account_id: accountId,
    } = response

    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
      accountId,
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
  accountId,
}) => {
  try {
    const usersList = await fetch(
      `https://api.epicgames.dev/epic/id/v1/accounts?accountId=${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => {
      logger.debug(res, 'res')
      if (res.status != 200)
        throw 'Epic Games authorization failed, or secret invalid'
      return res.json()
    })

    const user = await fetchUser(
      usersList[0]?.accountId,
      { username: usersList[0]?.displayName },
      EPIC_GAMES
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
        accessToken,
        accessTokenExpiration,
        refreshToken,
        username: usersList[0]?.displayName,
      },
    })

    return user
  } catch (e) {
    Sentry.captureException(e)
    throw `onConnected() ${e}`
  }
}

export const provider = {
  urlAuthorize: EPIC_GAMES_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
