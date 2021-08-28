// Adapted from https://github.com/oneclickdapp/ethereum-auth

import { getErrorResponse } from 'src/auth/helpers'
import { LOCAL_TOKEN_KEY } from 'src/auth/constants'

import { torus, loginWithTorus } from 'src/auth/torus'
import { isProduction } from 'src/utils/helpers'

// TODO: Remove console.logs
class TreasureChessAuthClient {
  constructor({ debug, onNetworkChange, onDisconnect }) {
    this.debug = debug
    this.onNetworkChange = onNetworkChange
    this.onDisconnect = onDisconnect

    torus.init()
    this.torus = torus
  }

  async login() {
    // type = WALLET_TYPES.torus
    try {
      let walletUserData
      try {
        walletUserData = await loginWithTorus()
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.log(e)
        throw Error('Error logging in with Torus')
      }
      /* eslint-disable-next-line no-console */
      if (!isProduction) console.log(walletUserData)
      localStorage.setItem(LOCAL_TOKEN_KEY, JSON.stringify(walletUserData))
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.log(
        getErrorResponse(`${e}. See above error for more details.`, 'login')
          .error.message
      )
    }
  }

  logout() {
    return localStorage.removeItem(LOCAL_TOKEN_KEY)
  }

  getToken() {
    return localStorage.getItem(LOCAL_TOKEN_KEY)
  }

  userMetadata() {
    // TODO: remove console.logs
    /* eslint-disable-next-line no-console */
    console.log('getting user metadata')
    /* eslint-disable-next-line no-console */
    console.log(localStorage.getItem(LOCAL_TOKEN_KEY))
    return JSON.parse(localStorage.getItem(LOCAL_TOKEN_KEY))
  }
}

export default TreasureChessAuthClient
