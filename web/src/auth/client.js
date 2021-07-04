// Adapted from https://github.com/oneclickdapp/ethereum-auth

import { getErrorResponse } from 'src/auth/helpers'
import { LOCAL_TOKEN_KEY, WALLET_TYPES } from 'src/auth/constants'

import { torus, loginWithTorus } from 'src/auth/torus'
import { isProduction } from 'src/utils/helpers'

class TreasureChessAuthClient {
  constructor({ debug, onNetworkChange, onDisconnect }) {
    this.debug = debug
    this.onNetworkChange = onNetworkChange
    this.onDisconnect = onDisconnect

    torus.init()
    this.torus = torus
  }

  async login(type = WALLET_TYPES.torus) {
    try {
      let walletUserData
      try {
        walletUserData = await loginWithTorus()
      } catch (e) {
        console.log(e)
        throw Error('Error logging in with Torus')
      }
      if (!isProduction) console.log(walletUserData)
      let token
      // Get token from torus
      localStorage.setItem(LOCAL_TOKEN_KEY, token)
    } catch (e) {
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

  getUserMetadata() {
    return localStorage.getItem(LOCAL_TOKEN_KEY)
  }
}

export default TreasureChessAuthClient
