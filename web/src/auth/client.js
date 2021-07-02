/////////////////////////////////
//
// Adapted from https://github.com/oneclickdapp/ethereum-auth
//
/////////////////////////////////

import { getErrorResponse } from 'src/auth/utils'

import { LOCAL_TOKEN_KEY, WALLET_TYPES } from 'src/auth/constants'

class EthereumAuthClient {
  constructor({ rpc, infuraId, debug, onNetworkChange, onDisconnect }) {
    this.debug = debug
    this.rpc = rpc
    this.infuraId = infuraId
    this.onNetworkChange = onNetworkChange
    this.onDisconnect = onDisconnect

    const torus = new TorusSdk({
      baseUrl: `${window.location.origin}/auth`,
      enableLogging: true,
      network: 'testnet', // details for test net
    })
    torus.init()
    this.torus = torus
  }

  async login(type = WALLET_TYPES.torus) {
    try {
      let torusUserData
      try {
        torusUserData = await state.torus.triggerLogin({
          typeOfLogin: 'google',
          verifier: 'googletest',
          clientId:
            '611240558687-r7lns3f17bovvmpufm5f4ha20i6sd1e9.apps.googleusercontent.com',
        })
      } catch (e) {
        console.log(e)
        throw Error('Error logging in with Torus')
      }

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
    if (this.type === WALLET_TYPES.walletConnect) disconnectWalletConnect()
    return localStorage.removeItem(LOCAL_TOKEN_KEY)
  }

  getToken() {
    return localStorage.getItem(LOCAL_TOKEN_KEY)
  }

  getUserMetadata() {
    return localStorage.getItem(LOCAL_TOKEN_KEY)
  }
}

export default EthereumAuthClient
