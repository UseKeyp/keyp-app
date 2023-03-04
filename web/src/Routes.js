import { Set, Router, Route, Private } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout'
import AllContextProviders from 'src/providers'

import AppUrlListener from './utils/AppUrlListener'

const Routes = () => {
  return (
    <Router>
      <AllContextProviders>
        <AppUrlListener />
        <Route path="/restricted" page={RestrictedPage} name="restricted" />
        <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
        <Set wrap={DefaultLayout}>
          <Private unauthenticated="login">
            <Route path="/profile" page={ProfilePage} name="profile" />
            <Route path="/" page={HomePage} name="home" />
          </Private>
          <Route path="/login" page={LoginPage} name="login" />
          <Route notfound page={NotFoundPage} />
          <Private unauthenticated="login">
            <Route path="/authorize" page={AuthorizePage} name="authorize" />
            {/*<Route path="/wallet" page={WalletPage} name="wallet" />*/}
          </Private>
        </Set>
      </AllContextProviders>
    </Router>
  )
}

export default Routes
