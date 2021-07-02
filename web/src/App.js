import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { AuthProvider } from 'src/providers/auth'
import { ContextProvider } from 'src/providers/context'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.scss'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodApolloProvider>
      <ContextProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ContextProvider>
    </RedwoodApolloProvider>
  </FatalErrorBoundary>
)

export default App
