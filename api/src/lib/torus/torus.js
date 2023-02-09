global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = undefined
global.document = undefined

import { getIdentifiersFromId } from 'src/lib/db'
import { isProduction } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { getNewIdToken } from 'src/lib/oAuth/jwt'

const NodeDetailManager =
  require('@toruslabs/fetch-node-details/dist/fetchNodeDetails-node.js').default
const TorusUtils =
  require('@toruslabs/torus.js/dist/torusUtils-node.js').default

const config = isProduction
  ? {
      network: 'cyan',
      proxyAddress: NodeDetailManager.PROXY_ADDRESS_CYAN,
    }
  : {
      network: 'testnet',
      proxyAddress: NodeDetailManager.PROXY_ADDRESS_TESTNET,
    }
const nodeDetailManager = new NodeDetailManager(config)

const TORUS_VERIFIER = isProduction
  ? {
      DISCORD: 'keyp-discord',
      GOOGLE: 'keyp-google',
      CHESS: 'treasure-chess-prod-1',
    }
  : {
      DISCORD: 'keyp-discord',
      GOOGLE: 'keyp-google',
      CHESS: 'treasure-chess-sandbox-aggregate',
    }

const torusUtils = new TorusUtils(
  isProduction
    ? {
        signerHost: 'https://signer-polygon.tor.us/api/sign',
        allowHost: 'https://signer-polygon.tor.us/api/allow',
      }
    : undefined
)

const getVerifier = (userProvider) => {
  const verifier = TORUS_VERIFIER[userProvider]
  if (!verifier) throw new Error(`No verifier for ${userProvider}`)
  return verifier
}

export const getTorusPublicAddress = async (userId) => {
  try {
    const { userProvider, userId: parsedUserId } = getIdentifiersFromId(userId)
    const verifier = getVerifier(userProvider)
    /* eslint-disable camelcase */
    const verifierDetails = {
      verifier,
      verifierId: parsedUserId,
    }
    const { torusNodeEndpoints, torusNodePub } =
      await nodeDetailManager.getNodeDetails(verifierDetails)

    const publicAddress = await torusUtils.getPublicAddress(
      torusNodeEndpoints,
      torusNodePub,
      verifierDetails
    )
    logger.debug(`getTorusPublicAddress ${publicAddress}`)
    return publicAddress.toLowerCase()
  } catch (e) {
    logger.error(e)
  }
}

export const getTorusWallet = async (userId) => {
  try {
    // NOTE: idToken for Discord is accessToken
    const idToken = await getNewIdToken(userId)
    const { userProvider, userId: parsedUserId } = getIdentifiersFromId(userId)
    const verifier = getVerifier(userProvider)
    logger.debug(`getTorusWallet ${parsedUserId}`)
    const verifierDetails = {
      verifier,
      verifierId: parsedUserId,
    }

    const { torusNodeEndpoints, torusIndexes } =
      await nodeDetailManager.getNodeDetails(verifierDetails)

    let verifierObject = { verifier_id: parsedUserId }
    if (userProvider === 'CHESS') {
      // Use custom JWT verification method
      verifierObject = {
        verify_params: [{ verifier_id: parsedUserId, idtoken: idToken }],
        sub_verifier_ids: ['chess'],
        verifier_id: parsedUserId,
      }
    }

    const retrieveSharesResponse = await torusUtils.retrieveShares(
      torusNodeEndpoints,
      torusIndexes,
      verifier,
      verifierObject,
      idToken
    )
    const { ethAddress, privKey } = retrieveSharesResponse
    logger.debug({ custom: { ethAddress, privKey } }, 'getTorusWallet')
    return { publicAddress: ethAddress, privateKey: privKey }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    logger.error(e)
  }
}
