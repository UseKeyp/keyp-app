import { Set, Router, Route, Private } from '@redwoodjs/router'
import DefaultLayout from 'src/layouts/DefaultLayout'
import AppUrlListener from './utils/AppUrlListener'
import AllContextProviders from 'src/providers'
import HomepageLayout from 'src/layouts/HomepageLayout/HomepageLayout'
import NoBackgroundLayout from 'src/layouts/NoBackgroundLayout/NoBackgroundLayout'

const Routes = () => {
  return (
    <Router>
      <AllContextProviders>
        <AppUrlListener />
        <Route path="/restricted" page={RestrictedPage} name="restricted" />
        <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
        <Route path="/redirect/{type}/{error}" page={RedirectPage} name="redirect" />
        <Set wrap={HomepageLayout}>
          <Route path="/" page={HomePage} name="home" />
        </Set>
        <Set wrap={NoBackgroundLayout}>
          <Private unauthenticated="signin">
            <Route path="/profile" page={ProfilePage} name="profile" />
          </Private>
        </Set>
        <Set wrap={DefaultLayout}>
          <Route path="/signin" page={SignInPage} name="signin" />
          <Route notfound page={NotFoundPage} />
          <Private unauthenticated="signin">
            <Route path="/wallet" page={WalletPage} name="wallet" />
            <Route path="/settings" page={SettingsPage} name="settings" />
          </Private>
          <Route path="/chain-data" page={ChainDataPage} name="chainData" />
        </Set>
      </AllContextProviders>
    </Router>
  )
}

export default Routes
