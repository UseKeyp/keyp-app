import { promisify } from 'util'

import * as jose from 'jose'
import { verify as verifyJwt, decode as decodeJwt } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { getIdentifiersFromId } from 'src/lib/db'
import jwks from 'src/lib/jwks'
import productionJwks from 'src/lib/oAuth/jwks'
import { LOGIN_ENABLED_PROVIDERS } from 'src/lib/oAuth/providers'
import {
  getChessBasicAuth,
  CHESS_OAUTH_URL,
} from 'src/lib/oAuth/providers/chess'
import { refreshChessTokens } from 'src/lib/oAuth/providers/chess'
import { refreshDiscordTokens } from 'src/lib/oAuth/providers/discord'
import { refreshGoogleTokens } from 'src/lib/oAuth/providers/google'

export const getNewIdToken = async (userId) => {
  try {
    const { userProvider } = getIdentifiersFromId(userId)
    let idToken
    if (userProvider === 'DISCORD')
      ({ accessToken: idToken } = await refreshDiscordTokens(userId))
    else if (userProvider === 'CHESS')
      ({ idToken } = await refreshChessTokens(userId))
    else if (userProvider === 'GOOGLE')
      ({ idToken } = await refreshGoogleTokens(userId))
    else if (LOGIN_ENABLED_PROVIDERS.includes(userProvider))
      idToken = await generateIdToken(userId)
    else
      throw new AuthenticationError(
        `getNewIdToken() Unknown userProvider: ${userProvider}`
      )
    return idToken
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new AuthenticationError('getNewIdToken() Unable to refresh session')
  }
}

// Generate a signed JWT from Keyp. Used for providers without a Torus Verifier eg. Twitter
const generateIdToken = async (userId) => {
  const alg = 'RS256'
  const mostRecentKey = jwks.keys.find((key) => key.alg === alg)
  if (!mostRecentKey) throw 'generateIdToken() JWK config error'
  const kid = mostRecentKey.kid

  const audience = 'urn:api-signing-service'
  const issuer = 'https://api.usekeyp.com' //change to api
  const keyObject = await jose.importJWK(mostRecentKey, alg)

  const jwt = await new jose.SignJWT({ sub: userId })
    .setProtectedHeader({ alg, kid })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('2m')
    .sign(keyObject)

  // NOTE: Leave for debugging purposes
  // const JWKS = jose.createRemoteJWKSet(
  //   new URL(
  //     'https://gist.githubusercontent.com/pi0neerpat/1e03942f7ccb58a2a6dd2ee33caa38b5/raw/5fb6c74cf82f6148750f970829bc590008bdce33/keyp%2520dev%2520jwks.json'
  //   )
  // )
  // const { payload, protectedHeader } = await jose.jwtVerify(jwt, JWKS, {
  //   issuer,
  //   audience,
  // })
  // console.log(protectedHeader)
  // console.log(payload)
  return jwt
}

// NOTE: below is unused from Chess
const getKey = async (header) => {
  const client = jwksClient({
    jwksUri: `${CHESS_OAUTH_URL}/certs`,
    requestHeaders: { Authorization: `Basic ${getChessBasicAuth()}` },
    timeout: 30000, // Defaults to 30s
    getKeysInterceptor: () => productionJwks, // Checks production keys vefore jwksUri
  })
  const getPubKey = promisify(client.getSigningKey)
  const key = await getPubKey(header.kid)
  const pubKey = key.getPublicKey()
  return pubKey
}

export const verifyChessJwt = async (jwt) => {
  // Refresh if necessary
  let idToken = jwt
  let { header, payload } = decodeJwt(idToken, { complete: true })

  /* eslint-disable-next-line no-constant-condition */
  if (new Date(payload.exp * 1000) > new Date()) {
    idToken = await getNewIdToken(payload.user_id)
    ;({ header } = decodeJwt(idToken, { complete: true }))
  }

  const pubKey = await getKey(header)
  const decoded = verifyJwt(
    idToken,
    pubKey,
    { algorithms: ['RS256'] },
    (err, _decoded) => {
      if (err) throw err
      return _decoded
    }
  )
  return { decoded, newJwt: idToken }
}
