import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AuthProvider } from '@redwoodjs/auth'

import { ContextProvider } from 'src/providers/context'

import TreasureChessAuthClient from 'src/auth/client'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.scss'

const authClient = new TreasureChessAuthClient({})

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={authClient} type="ethereum">
      <RedwoodApolloProvider>
        <ContextProvider>
          <Routes />
        </ContextProvider>
      </RedwoodApolloProvider>
    </AuthProvider>
  </FatalErrorBoundary>
)

export default App
