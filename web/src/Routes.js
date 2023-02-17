import { Set, Router, Route, Private } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout'
import AllContextProviders from 'src/providers'

import AppUrlListener from './utils/AppUrlListener'

const Routes = () => {
  return (
    <Router>
      <AllContextProviders>
        <AppUrlListener />
        <Route path="/wert" page={WertPage} name="wert" />
        <Route path="/restricted" page={RestrictedPage} name="restricted" />
        <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />
        <Set wrap={DefaultLayout}>
          <Private unauthenticated="login">
            <Route path="/account" page={AccountPage} name="account" />
          </Private>
          <Route path="/users/{usernameOrAddress}" page={UserPage} name="user" />
          <Route path="/" page={HomePage} name="home" />
          <Route path="/login" page={LoginPage} name="login" />
          <Route notfound page={NotFoundPage} />
          <Route path="/terms" page={TermsPage} name="terms" />
          <Route path="/privacy" page={PrivacyPage} name="privacy" />
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/support" page={SupportPage} name="support" />
          <Private unauthenticated="login">
            <Route path="/authorize" page={AuthorizePage} name="authorize" />
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
