import { AuthenticationError } from '@redwoodjs/graphql-server'

import { DISCORD } from 'src/lib/oAuth/providers/discord'
import { CHESS } from 'src/lib/oAuth/providers/chess'
import { NODE_OIDC } from 'src/lib/oAuth/providers/node-oidc'

const APPROVED_LOGIN_PROVIDERS = [CHESS, DISCORD, NODE_OIDC]

export const validateLoginRequest = ({ type }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not available for login.')
  }
}
