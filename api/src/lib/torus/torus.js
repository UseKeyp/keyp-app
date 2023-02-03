global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = undefined
global.document = undefined

import NodeManager from '@toruslabs/fetch-node-details/dist/fetchNodeDetails-node'
import TorusUtils from '@toruslabs/torus.js/dist/torusUtils-node'

import { getIdentifiersFromId } from 'src/lib/db'
import { isProduction } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { getNewIdToken } from 'src/lib/oAuth/jwt'

const TORUS_VERIFIER = {
  prod: {
    DISCORD: 'usekeyp-discord', // TODO: change to patrick@usekeyp.com
    GOOGLE: 'google',
    TWITTER: 'twitter',
    CHESS: 'chess',
  },
  dev: {
    DISCORD: 'discord',
    GOOGLE: 'google',
    TWITTER: 'twitter',
    CHESS: 'chess',
  },
}

let config = {
  network: 'ropsten',
  proxyAddress: '0x6258c9d6c12ed3edda59a1a6527e469517744aa7',
}
if (isProduction)
  config = {
    network: 'polygon-mainnet',
    proxyAddress: '0x9f072ba19b3370e512aa1b4bfcdaf97283168005',
  }
const fetchNodeDetails = new NodeManager(config)
const torusUtils = new TorusUtils(
  isProduction
    ? {
        signerHost: 'https://signer-polygon.tor.us/api/sign',
        allowHost: 'https://signer-polygon.tor.us/api/allow',
      }
    : undefined
)

const getVerifier = (userProvider) => {
  const verifier = TORUS_VERIFIER[process.env.NODE_ENV][userProvider]
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
      await fetchNodeDetails.getNodeDetails(verifierDetails)

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
    // idToken for Discord is accessToken
    const idToken = await getNewIdToken(userId)
    // NOTE: Old chess.com way using jwt
    /* eslint-disable camelcase */
    // const { user_id: verifierId } = decodeJwt(idToken)
    // const verifierDetails = {
    //   verifier: process.env.TORUS_VERIFIER,
    //   verifierId: verifierId,
    // }
    const { userProvider, userId: parsedUserId } = getIdentifiersFromId(userId)
    const verifier = getVerifier(userProvider)
    logger.debug(`getTorusWallet ${parsedUserId}`)
    const verifierDetails = {
      verifier,
      verifierId: parsedUserId,
    }

    const { torusNodeEndpoints, torusIndexes } =
      await fetchNodeDetails.getNodeDetails(verifierDetails)
    const retrieveSharesResponse = await torusUtils.retrieveShares(
      torusNodeEndpoints,
      torusIndexes,
      verifier,
      // NOTE: old chess.com way using jwt
      // {
      //   verify_params: [{ verifier_id: verifierId, idtoken: idToken }],
      //   sub_verifier_ids: ['chess'],
      //   verifier_id: verifierId,
      // },
      { verifier_id: parsedUserId },
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
