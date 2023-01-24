import { AuthenticationError } from '@redwoodjs/graphql-server'

import { CHESS } from 'src/lib/oAuth/providers/chess'
import { DISCORD } from 'src/lib/oAuth/providers/discord'
import { GOOGLE } from 'src/lib/oAuth/providers/google'
import { NODE_OIDC } from 'src/lib/oAuth/providers/node-oidc'

const APPROVED_LOGIN_PROVIDERS = [CHESS, DISCORD, NODE_OIDC, GOOGLE]

export const validateLoginRequest = ({ type }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not available for login.')
  }
}
