import { AuthenticationError } from '@redwoodjs/graphql-server'

import { LOGIN_ENABLED_PROVIDERS } from 'src/lib/oAuth/providers'

export const validateLoginRequest = ({ type }) => {
  if (!LOGIN_ENABLED_PROVIDERS.includes(type)) {
    throw new AuthenticationError('OAuth provider not available for login.')
  }
}
