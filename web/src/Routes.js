import { Router, Route, Set, Private } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout'
import DefaultLayoutNoHeaderOrFooter from 'src/layouts/DefaultLayoutNoHeaderOrFooter/DefaultLayoutNoHeaderOrFooter'
import AllContextProviders from 'src/providers'

import AppUrlListener from './utils/AppUrlListener'

const Routes = () => {
  return (
    <Router>
      <AllContextProviders>
        <AppUrlListener />
        <Set wrap={DefaultLayoutNoHeaderOrFooter}>
          <Route path="/login" page={LoginPage} name="login" />
          <Private unauthenticated="login">
            <Route path="/authorize" page={AuthorizePage} name="authorize" />
          </Private>
        </Set>
        <Set wrap={DefaultLayout}>
          <Private unauthenticated="login">
            <Route path="/profile" page={ProfilePage} name="profile" />
            <Route path="/" page={HomePage} name="home" />
          </Private>
          <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
          <Route notfound page={NotFoundPage} />
        </Set>
      </AllContextProviders>
    </Router>
  )
}

export default Routes
