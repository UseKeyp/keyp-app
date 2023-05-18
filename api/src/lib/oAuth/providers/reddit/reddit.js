import fetch from 'cross-fetch'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const REDDIT = 'REDDIT'
export const REDDIT_OAUTH_URL_AUTHORIZE = `https://www.reddit.com/api/v1/authorize`

const REDDIT_OAUTH_URL_TOKEN = `https://www.reddit.com/api/v1/access_token`
const REDDIT_SCOPE = 'identity'
const REDDIT_REDIRECT_URI = APP_DOMAIN + '/redirect/reddit'

// User agent should be in the format <platform>:<app ID>:<version string> (by /u/<reddit username>)
const USER_AGENT_STRING = `web:${process.env.REDDIT_CLIENT_ID}:v0.1 (by /u/kepler-bot)`

const responseType = 'code'

const params = {
  client_id: process.env.REDDIT_CLIENT_ID,
  scope: REDDIT_SCOPE,
  redirect_uri: REDDIT_REDIRECT_URI,
  response_type: responseType,
  duration: 'permanent',
}

export const onSubmitCode = async (code, { codeVerifier }) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.REDDIT_CLIENT_ID,
      client_secret: process.env.REDDIT_CLIENT_SECRET,
      redirect_uri: REDDIT_REDIRECT_URI,
      code_verifier: codeVerifier,
      code,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(REDDIT_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': USER_AGENT_STRING,
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
          ).toString('base64'),
      },
    }).then((res) => {
      if (res.status != 200)
        throw `REDDIT API failed for /token. Returned ${res.status} - ${res.statusText}`
      return res.json()
    })

    logger.debug({ custom: response }, 'onSubmitToken response from Reddit')

    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      refresh_token: refreshToken,
      access_token: accessToken,
      expires_in: expiration,
    } = response

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: getExpiration(expiration),
    }
  } catch (e) {
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({ refreshToken, accessToken }) => {
  try {
    const userDetails = await fetch('https://oauth.reddit.com/api/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': USER_AGENT_STRING,
      },
    }).then((res) => res.json())

    if (!userDetails.verified)
      throw new AuthenticationError(
        `Verify your email with Reddit and try again.`
      )

    logger.debug({ custom: userDetails }, 'userDetails from Reddit')
    logger.debug(
      { custom: userDetails.has_verified_email },
      'has_verified_email'
    )

    if (!userDetails.has_verified_email) throw 'Email must be verified'

    const user = await fetchUser(
      userDetails.id,
      { username: userDetails.name },
      REDDIT
    )

    let publicAddress
    if (!user.address) {
      try {
        publicAddress = await getTorusPublicAddress(user)
      } catch (e) {
        logger.error("Error fetching user's wallet from Torus")
        logger.error(e)
      }
    }

    const imageSrc = userDetails?.icon_img

    await db.user.update({
      where: { id: user.id },
      data: {
        ...(publicAddress && { address: publicAddress }),
        imageSrc: imageSrc,
        accessToken,
        refreshToken,
        username: userDetails.name,
      },
    })

    return user
  } catch (e) {
    logger.error(e)
    throw `onConnected() ${e}`
  }
}

export const provider = {
  urlAuthorize: REDDIT_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
