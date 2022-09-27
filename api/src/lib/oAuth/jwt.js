import {
  verify as verifyJwt,
  decode as decodeJwt,
  sign as signJwt,
} from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { promisify } from 'util'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import productionJwks from 'src/lib/oAuth/jwks'
import {
  getChessBasicAuth,
  refreshChessTokens,
  CHESS_OAUTH_URL,
} from 'src/lib/oAuth/providers/chess'

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

// TODO: update this to only refresh the Discord token
export const getNewIdToken = async (userId) => {
  try {
    const { refreshToken } = await db.member.findUnique({
      where: { id: userId },
    })
    const {
      refreshToken: newRefreshToken,
      idToken,
      accessToken: newAccessToken,
    } = await refreshChessTokens(refreshToken)
    await db.member.update({
      where: { id: userId },
      data: { refreshToken: newRefreshToken, accessToken: newAccessToken },
    })
    return idToken
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new AuthenticationError('getNewIdToken() Unable to refresh session')
  }
}

// var privateKey = fs.readFileSync('privateKey.pem', 'utf8')
const privateKey =
  'MIIBOwIBAAJBAP0Y031X+gi8WxJj3DbwntatZ6ZO4kBwJarwwK3quyPloPCE1zov4o/3TfniniTEGiyfxOVFvA6+gBHRtlZo3JkCAwEAAQJBAImGouy6EFAM4UO15WQpDXZDVU3mEUTIa39eQKSAJt4ShObViahfHmZLb4Kw8y8TmCtNCAEpWCY9mI2yyhSiqH0CIQD/I5bqlgQHgCWAkKy6y/6fV6S7uJ34lxfg3ociwOrkfwIhAP3zePdnUAgGUweLuk51pKdulQDOJ/sGfJyweXTIvFLnAiAZ0ZgsFRJDUAx7fih8nrgdl9jrxjr2NRQNhXdXZP5gMQIhAPb/27VO0CGt/Q4G0qPDeu26+cQ5v9tBeOxyHQAAymMbAiBad9U6yvT/so9O2mCJPcqHThgA14syR9Nq4Ccq0Zw+jw=='
const publicKey =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAP0Y031X+gi8WxJj3DbwntatZ6ZO4kBwJarwwK3quyPloPCE1zov4o/3TfniniTEGiyfxOVFvA6+gBHRtlZo3JkCAwEAAQ=='
// fs.readFileSync('publicKey.pem', 'utf8')

export const generateIdToken = () => {
  var token = signJwt(
    {
      sub: 'Custom JWT for Web3Auth Custom Auth',
      name: 'Bob Smith',
      email: 'shahbaz@web3auth.io',
      aud: 'urn:feather-collabland-demo',
      iss: 'https://api.feather.niftychess.com',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    privateKey,
    {
      algorithm: 'RS256',
      // NOTE get kid with openssl rand -hex 12
      header: { alg: 'RS256', kid: '75d809beae4c8e9212a83874b' },
    }
  )

  var decoded = verifyJwt(token, publicKey)
  return decoded
}
