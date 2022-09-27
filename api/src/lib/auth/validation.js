import { AuthenticationError } from '@redwoodjs/graphql-server'

import { DISCORD } from 'src/lib/oAuth/providers/discord'
import { CHESS } from 'src/lib/oAuth/providers/chess'

const APPROVED_LOGIN_PROVIDERS = [CHESS, DISCORD]

export const validateLoginRequest = ({ type }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not available for login.')
  }
}
