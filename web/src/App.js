import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { ContextProvider } from 'src/providers/context'

import './scaffold.css'
import './index.scss'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodApolloProvider>
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </RedwoodApolloProvider>
  </FatalErrorBoundary>
)

export default App
