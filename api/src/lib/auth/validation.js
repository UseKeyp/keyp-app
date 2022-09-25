import { AuthenticationError } from '@redwoodjs/graphql-server'

import { DISCORD } from 'src/lib/oAuth/providers/discord'

const APPROVED_LOGIN_PROVIDERS = [DISCORD]

export const validateLoginRequest = ({ type }) => {
  if (!APPROVED_LOGIN_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not available for login.')
  }
}
