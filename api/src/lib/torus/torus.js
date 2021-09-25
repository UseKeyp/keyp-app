import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

const torus = new DirectWebSdk({
  baseUrl: 'http://localhost:3000/auth',
  network: 'testnet',
})

export const fetchWalletAddress = async (idToken) => {
  await torus.init({ skipSw: true })

  const { privateKey, publicAddress } = await torus.getTorusKey({
    verifier: 'treasure-chess-6',
    verifierId: 'sub',
    verifierParams: { verifier_id: 'sub' },
    idToken,
  })
  console.log({ publicAddress, privateKey })
  return publicAddress
}
