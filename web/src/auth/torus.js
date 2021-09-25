import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/utils/helpers'
import { LOCAL_TOKEN_KEY } from 'src/auth/constants'

const torus = new DirectWebSdk({
  baseUrl: `${window.location.origin}/auth`,
  network: 'testnet',
  enableLogging: !isProduction,
})

export const fetchWalletAddress = async () => {
  await torus.init()

  const idToken = localStorage.getItem(LOCAL_TOKEN_KEY)

  const { privateKey, publicAddress } = await torus.getTorusKey(
    'treasure-chess-testnet',
    'sub',
    { verifier_id: 'sub' },
    idToken
  )
  console.log({ publicAddress, privateKey })
  return publicAddress
}
