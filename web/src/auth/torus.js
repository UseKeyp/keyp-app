import TorusSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/utils/helpers'

export const torus = new TorusSdk({
  baseUrl: `${window.location.origin}/auth`,
  enableLogging: !isProduction,
  network: 'testnet', // details for test net
})

export const loginWithTorus = async () =>
  await torus.triggerLogin({
    typeOfLogin: 'google',
    verifier: 'googletest',
    clientId:
      '611240558687-r7lns3f17bovvmpufm5f4ha20i6sd1e9.apps.googleusercontent.com',
  })
