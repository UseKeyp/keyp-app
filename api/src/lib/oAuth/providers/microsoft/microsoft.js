import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const MICROSOFT = 'MICROSOFT'
export const MICROSOFT_OAUTH_URL_AUTHORIZE =
  'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'

const MICROSOFT_OAUTH_URL_TOKEN =
  'https://login.microsoftonline.com/common/oauth2/v2.0/token'
const MICROSOFT_SCOPE = [
  'openid',
  'email',
  'profile',
  'offline_access',
  'User.Read',
]
const MICROSOFT_REDIRECT_URI = APP_DOMAIN + '/redirect/microsoft'

const responseType = 'code'
const params = {
  client_id: process.env.MICROSOFT_CLIENT_ID,
  scope: MICROSOFT_SCOPE,
  redirect_uri: MICROSOFT_REDIRECT_URI,
  response_type: 'code',
}

export const onSubmitCode = async (code, { codeVerifier }) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.MICROSOFT_CLIENT_ID,
      client_secret: process.env.MICROSOFT_CLIENT_SECRET,
      redirect_uri: MICROSOFT_REDIRECT_URI,
      code,
      code_verifier: codeVerifier,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(MICROSOFT_OAUTH_URL_TOKEN, {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => res.json())

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
    logger.error({ custom: e }, 'Microsoft submitCodeGrant')
    throw `onSubmitCode() ${e}`
  }
}

export const onConnected = async ({ refreshToken, accessToken }) => {
  try {
    const userDetails = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json())

    const user = await fetchUser(
      userDetails.id,
      { username: userDetails.displayName },
      MICROSOFT
    )

    let publicAddress
    if (!user.address) {
      publicAddress = await getTorusPublicAddress(user)
    }

    const email = userDetails?.userPrincipalName
      ? userDetails?.userPrincipalName
      : userDetails?.mail

    await db.user.update({
      where: { id: user.id },
      data: {
        ...(publicAddress && { address: publicAddress }),
        accessToken,
        refreshToken,
        email: email,
        username: userDetails?.displayName,
      },
    })

    return user
  } catch (e) {
    logger.error({ custom: e }, 'Microsoft onConnected')
    throw `onConnected() ${e}`
  }
}

export const provider = {
  urlAuthorize: MICROSOFT_OAUTH_URL_AUTHORIZE,
  params,
  onSubmitCode,
  onConnected,
  responseType,
}
