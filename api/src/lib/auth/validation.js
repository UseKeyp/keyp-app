import { AuthenticationError } from '@redwoodjs/graphql-server'

import { CHESS } from 'src/lib/oAuth/providers/chess'
import { DISCORD } from 'src/lib/oAuth/providers/discord'
import { NODE_OIDC } from 'src/lib/oAuth/providers/node-oidc'
import { TWITTER } from 'src/lib/oAuth/providers/twitter'

const APPROVED_LOGIN_PROVIDERS = [CHESS, DISCORD, NODE_OIDC, TWITTER]

export const validateLoginRequest = ({ type }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not available for login.')
  }
}
