import oauth2Server from 'oauth2-server-redwood'
import serverless from 'serverless-http'

import middlewares from 'src/functions/oauth/middlewares'
import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import jwks from 'src/lib/jwks'

let devPortalRedirectUris = [
  'http://0.0.0.0:8910/redirect/keyp',
  'https://dev.staging-env.usekeyp.com/redirect/keyp',
  'http://localhost:4000/api/auth/callback/keyp',
  'https://oauth.pstmn.io/v1/callback',
]
if (process.env.ENVIRONMENT === 'staging')
  devPortalRedirectUris = ['https://dev.staging-env.usekeyp.com/redirect/keyp']

if (process.env.ENVIRONMENT === 'prod')
  devPortalRedirectUris = ['https://dev.usekeyp.com/redirect/keyp']

export let clients = [
  {
    client_id: 'dev-portal',
    redirect_uris: devPortalRedirectUris,
    logo_uri: 'https://dev.usekeyp.com/favicon.png',
    client_name: 'Keyp Dev Portal',
    tos_uri: 'https://www.usekeyp.com/terms-of-use-privacy-policy#Terms-of-Use',
    policy_uri:
      'https://www.usekeyp.com/terms-of-use-privacy-policy#Privacy-Policy',
    payload: { network: 'POLYGON' },
  },
]
if (process.env.ENVIRONMENT === 'dev') {
  clients.push({
    client_id: 'test-client',
    redirect_uris: [
      ...devPortalRedirectUris,
      'http://localhost:3000/redirect/keyp',
      'http://localhost:3001/redirect/keyp',
    ],
    tos_uri: 'http://0.0.0.0:8910/tos',
    logo_uri: 'http://0.0.0.0:8910/favicon.png',
    client_uri: 'http://0.0.0.0:8910',
    policy_uri: 'http://0.0.0.0:8910/policy',
    client_name: 'Test Client',
  })
}

const API_URL =
  process.env.REDWOOD_API_URL || `${APP_DOMAIN}/.redwood/functions`

export const handler = serverless(
  oauth2Server(db, {
    SECURE_KEY: process.env.OAUTH_SECRET_KEY,
    ISSUER_URL: API_URL,
    REDWOOD_API_URL: API_URL,
    INTROSPECTION_SECRET: process.env.INTROSPECTION_SECRET,
    routes: { login: '/login', authorize: '/authorize' },
    jwks,
    middlewares,
    config: {
      // OIDC-Provider config, see https://github.com/panva/node-oidc-provider
      clients,
      claims: {
        openid: ['sub', 'provider', 'username', 'address'],
        email: ['email', 'email_verified'],
      },
      ttl: {
        // Sessions
        Session: 1209600, // 14 days in seconds
        Interaction: 600, // 10 minutes
        DeviceCode: 600, // 10 minutes
        // Tokens
        AuthorizationCode: 60, //  1 minute
        IdToken: 3600, // 1 hour
        AccessToken: 86400, // 24 hours
        Grant: 1209600, // 14 days in seconds
      },
    },
  })
)
