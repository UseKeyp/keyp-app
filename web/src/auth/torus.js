import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/utils/helpers'
import { LOCAL_TOKEN_KEY } from 'src/auth/constants'

const torus = new DirectWebSdk({
  baseUrl: `${window.location.origin}/auth`,
  network: 'testnet',
  enableLogging: !isProduction,
})

export const fetchWalletAddress = async () => {
  await torus.init({
    // skipSw: false
  })

  const idToken = localStorage.getItem(LOCAL_TOKEN_KEY)
  const { privateKey, publicAddress } = await torus.getTorusKey({
    verifier: 'treasure-chess-6',
    verifierId: 'sub',
    verifierParams: { verifier_id: 'sub' },
    idToken,
    // TODO: Do we really need to provide these?
    typeOfLogin: 'jwt',
    jwtParams: {
      // TODO: Get from ENV Variables
      domain: process.env.CHESS_OAUTH_URL,
    },
    clientId: '698dc2de-bf15-11eb-8440-23c93af1e66f',
  })
  console.log({ publicAddress, privateKey })
  return publicAddress
}

// export const loginWithTorus = async () =>
//   await torus.triggerLogin({
//     typeOfLogin: 'google',
//     verifier: 'googletest',
//     clientId:
//       '611240558687-r7lns3f17bovvmpufm5f4ha20i6sd1e9.apps.googleusercontent.com',
//   })
