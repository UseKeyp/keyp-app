import { AuthenticationError } from '@redwoodjs/graphql-server'

import { isProdOrStaging } from 'src/lib/helpers'
import { CHESS } from 'src/lib/oAuth/providers/chess'
import { DISCORD } from 'src/lib/oAuth/providers/discord'
import { GOOGLE } from 'src/lib/oAuth/providers/google'
import { NODE_OIDC } from 'src/lib/oAuth/providers/node-oidc'
import { TWITTER } from 'src/lib/oAuth/providers/twitter'

const APPROVED_LOGIN_PROVIDERS = isProdOrStaging
  ? [CHESS, DISCORD, GOOGLE]
  : [CHESS, DISCORD, NODE_OIDC, GOOGLE, TWITTER]

export const validateLoginRequest = ({ type }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not available for login.')
  }
}
