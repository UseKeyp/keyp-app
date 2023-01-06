import React from 'react'

import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import AllContextProviders from '../src/providers'

export const decorators = [
  (Story) => (
    <RedwoodApolloProvider>
      <AllContextProviders>
        <Story />
      </AllContextProviders>
    </RedwoodApolloProvider>
  ),
]
