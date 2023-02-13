import oauth2Server from 'oauth2-server-redwood'
import serverless from 'serverless-http'

import middlewares from 'src/functions/oauth/middlewares'
import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import jwks from 'src/lib/jwks'

let devPortalRedirectUris = [
  'http://0.0.0.0:8910/redirect/keyp',
  'https://dev.staging-env.usekeyp.com/redirect/keyp',
]
if (process.env.ENVIRONMENT === 'prod')
  devPortalRedirectUris = ['https://dev.usekeyp.com/redirect/keyp']

export const handler = serverless(
  oauth2Server(db, {
    SECURE_KEY: process.env.OAUTH_SECRET_KEY,
    ISSUER_URL: APP_DOMAIN,
    REDWOOD_API_URL:
      process.env.REDWOOD_API_URL || `${APP_DOMAIN}/.redwood/functions`,
    INTROSPECTION_SECRET: process.env.INTROSPECTION_SECRET,
    routes: { login: '/login', authorize: '/authorize' },
    jwks,
    middlewares,
    config: {
      // OIDC-Provider config, see https://github.com/panva/node-oidc-provider
      clients: [
        {
          client_id: 'dev-portal',
          redirect_uris: devPortalRedirectUris,
        },
      ],
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
