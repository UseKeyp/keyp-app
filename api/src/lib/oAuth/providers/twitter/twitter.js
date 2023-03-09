import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const TWITTER = 'TWITTER'
export const TWITTER_OAUTH_URL_AUTHORIZE = `https://twitter.com/i/oauth2/authorize`

const TWITTER_OAUTH_URL_TOKEN = `https://api.twitter.com/2/oauth2/token`

const TWITTER_SCOPE = 'users.read tweet.read offline.access'

const TWITTER_REDIRECT_URI = APP_DOMAIN + '/redirect/twitter'

const TWITTER_BASIC_SECRET = Buffer.from(
  `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
).toString('base64')

const responseType = 'code'
const params = {
  client_id: process.env.TWITTER_CLIENT_ID,
  scope: TWITTER_SCOPE,
  redirect_uri: TWITTER_REDIRECT_URI,
  prompt: 'none',
}
export const onSubmitCode = async (code, { codeVerifier }) => {
  try {
    const body = {
      response_type: 'code',
      grant_type: 'authorization_code',
      client_id: process.env.TWITTER_CLIENT_ID,
      client_secret: process.env.TWITTER_CLIENT_SECRET,
      redirect_uri: TWITTER_REDIRECT_URI,
      code_verifier: codeVerifier,
      code,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(TWITTER_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: {
        Authorization: `Basic ${TWITTER_BASIC_SECRET}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (res.status != 200)
        throw `TWITTER API failed for /token. Returned ${res.status} - ${res.statusText}`
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    logger.debug({ custom: response }, '/token')

    const {
      access_token: accessToken,
      expires_in: expiration,
      refresh_token: refreshToken,
    } = response

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
    const { data: userDetails } = await fetch(
      `https://api.twitter.com/2/users/me?user.fields=location,verified,verified_type,profile_image_url,public_metrics`,
      //followers_count,following_count,tweet_count
      { headers: { Authorization: `Bearer ${accessToken}` } }
    ).then((res) => {
      if (res.status != 200)
        throw 'TWITTER authorization failed, or secret invalid'
      return res.json()
    })

    logger.debug({ custom: userDetails }, '/me')

    const { id, username } = userDetails

    const user = await fetchUser(id, { username }, TWITTER)

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
        imageSrc: userDetails.profile_image_url,
        providerMetadata: {
          verified: userDetails.verified,
          verified_type: userDetails.verified_type,
          location: userDetails.location,
          ...userDetails.public_metrics,
        },
        followerCount: Number(userDetails.public_metrics.followers_count),
        refreshToken,
        accessToken,
      },
    })

    return user
  } catch (e) {
    logger.error(e)
    throw `onConnected() ${e}`
  }
}

export const provider = {
  urlAuthorize: TWITTER_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
