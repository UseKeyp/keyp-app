global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = undefined
global.document = undefined

import { keccak256 } from 'web3-utils'

import { getIdentifiersFromId } from 'src/lib/db'
import { isProdOrStaging } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { getNewIdToken } from 'src/lib/oAuth/jwt'

const NodeDetailManager =
  require('@toruslabs/fetch-node-details/dist/fetchNodeDetails-node.js').default
const TorusUtils =
  require('@toruslabs/torus.js/dist/torusUtils-node.js').default

const config = isProdOrStaging
  ? {
      network: 'cyan',
      proxyAddress: NodeDetailManager.PROXY_ADDRESS_CYAN,
    }
  : {
      network: 'testnet',
      proxyAddress: NodeDetailManager.PROXY_ADDRESS_TESTNET,
    }
const nodeDetailManager = new NodeDetailManager(config)

const SUPPORTED_EXTERNAL_VERIFIERS = ['DISCORD', 'GOOGLE', 'CHESS']

const TORUS_VERIFIER = isProdOrStaging
  ? {
      DISCORD: 'keyp-discord',
      GOOGLE: 'keyp-google',
      CHESS: 'treasure-chess-prod-1',
      KEYP: 'keyp-oauth-provider-1',
    }
  : {
      DISCORD: 'keyp-discord',
      GOOGLE: 'keyp-google',
      CHESS: 'treasure-chess-sandbox-aggregate',
      KEYP: 'keyp-oauth-provider-1',
    }

const torusUtils = new TorusUtils(
  isProdOrStaging
    ? {
        signerHost: 'https://signer-polygon.tor.us/api/sign',
        allowHost: 'https://signer-polygon.tor.us/api/allow',
      }
    : undefined
)

const getVerifier = (userProvider) => {
  let verifier = TORUS_VERIFIER.KEYP
  if (SUPPORTED_EXTERNAL_VERIFIERS.includes(userProvider))
    verifier = TORUS_VERIFIER[userProvider]
  if (!verifier) throw new Error(`No verifier for ${userProvider}`)
  return verifier
}

export const getTorusPublicAddress = async (user) => {
  try {
    const { id: userId } = user
    const { userProvider, userId: parsedUserId } = getIdentifiersFromId(userId)
    // For Keyp, verifierId includes the provider eg. "TWITTER-123456789"
    let verifierId = userId
    if (SUPPORTED_EXTERNAL_VERIFIERS.includes(userProvider))
      verifierId = parsedUserId
    if (userProvider === 'GOOGLE') verifierId = user.email

    const verifier = getVerifier(userProvider)

    const verifierDetails = {
      verifier,
      verifierId,
    }
    const { torusNodeEndpoints, torusNodePub } =
      await nodeDetailManager.getNodeDetails(verifierDetails)

    const publicAddress = await torusUtils.getPublicAddress(
      torusNodeEndpoints,
      torusNodePub,
      verifierDetails
    )
    logger.debug(`getTorusPublicAddress() for ${userId} ${publicAddress}`)
    return publicAddress.toLowerCase()
  } catch (e) {
    logger.error(e)
  }
}

export const getTorusWallet = async (user) => {
  try {
    const { id: userId } = user
    const { userProvider, userId: parsedUserId } = getIdentifiersFromId(userId)
    // For Keyp, verifierId includes the provider eg. "TWITTER-123456789"
    let verifierId = userId
    if (SUPPORTED_EXTERNAL_VERIFIERS.includes(userProvider))
      verifierId = parsedUserId
    if (userProvider === 'GOOGLE') verifierId = user.email

    const idToken = await getNewIdToken(userId)
    const verifier = getVerifier(userProvider)

    const verifierDetails = {
      verifier,
      verifierId,
    }

    const { torusNodeEndpoints, torusIndexes } =
      await nodeDetailManager.getNodeDetails(verifierDetails)

    let verifierObject = { verifier_id: verifierId }
    let idTokenForTorus = idToken

    if (userProvider === 'CHESS') {
      // Use custom JWT verification method
      verifierObject = {
        verify_params: [{ verifier_id: verifierId, idtoken: idToken }],
        sub_verifier_ids: ['chess'],
        verifier_id: verifierId,
      }
      idTokenForTorus = keccak256(idToken)
      idTokenForTorus = idTokenForTorus.substring(2)
    }

    const retrieveSharesResponse = await torusUtils.retrieveShares(
      torusNodeEndpoints,
      torusIndexes,
      verifier,
      verifierObject,
      idTokenForTorus
    )
    const { ethAddress, privKey } = retrieveSharesResponse
    logger.debug(
      {
        custom: {
          userId: verifierId,
          ethAddress,
          privKeyLength: `${privKey.length} (should be 64)`,
        },
      },
      'getTorusWallet'
    )
    return { publicAddress: ethAddress, privateKey: privKey }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    logger.error(e)
    throw 'Unable to load wallet'
  }
}
