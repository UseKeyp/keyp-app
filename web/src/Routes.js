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
        <Route path="/wert" page={WertPage} name="wert" />
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
          <Route path="/users/{usernameOrAddress}" page={UserPage} name="user" />
          <Route path="/authorize" page={AuthorizePage} name="authorize" />
        </Set>
        <Set wrap={DefaultLayout}>
          <Route path="/login" page={SignInPage} name="login" />
          <Route notfound page={NotFoundPage} />
          <Route path="/terms" page={TermsPage} name="terms" />
          <Route path="/privacy" page={PrivacyPage} name="privacy" />
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/support" page={SupportPage} name="support" />
          <Private unauthenticated="login">
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
