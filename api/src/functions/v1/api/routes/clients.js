import { v4 as uuidv4 } from 'uuid'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { AVAILABLE_NETWORKS } from 'src/lib/web3/provider'

var express = require('express')
var router = express.Router()

//////////////////
// Pre-Middleware
const onlyDevPortalClient = (req, res, next) => {
  if (req.ctx.clientId !== 'dev-portal')
    return res
      .status(401)
      .send('/clients endpoints are only available via the dev-portal')
  next()
}
router.use(onlyDevPortalClient)

const getAccessLevel = (developers, userId) => {
  if (!developers) return 'NONE'
  const developer = developers.find((developer) => developer.userId === userId)
  return developer.accessLevel
}

const validateEditAccess = (developers, userId) => {
  if (!getAccessLevel(developers, userId)) throw new Error('Unauthorized')
}

const validateOwnerAccess = (developers, userId) => {
  if (!getAccessLevel(developers, userId) !== 'OWNER')
    throw new Error('Unauthorized')
}

router.get('/', async (req, res) => {
  try {
    const { userProvider, userId } = req.ctx
    const clients = await db.oidc.findMany({
      where: { developers: { some: { userProvider, userId } } },
      include: { developers: true },
    })
    res.send(
      clients
        .filter((client) => !client.disabled)
        .map((client) => ({
          ...client,
          accessLevel: getAccessLevel(client.developers, req.ctx.userId),
        }))
    )
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: e })
  }
})

router.patch('/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params
    const {
      redirect_uris,
      clientURI,
      clientName,
      tosURI,
      logoURI,
      policyURI,
      network,
    } = req.body

    if (!redirect_uris) throw new Error('Missing redirect_uris')
    if (!network || !AVAILABLE_NETWORKS.includes(network))
      throw new Error(`Network ${network} not supported`)

    let client = await db.oidc.findUnique({
      where: { id_type: { id: clientId, type: 7 } },
      select: { developers: true, payload: true },
    })
    if (!client) throw new Error('Client not found')
    validateEditAccess(client.developers, req.ctx.userId)
    // TODO validate list as https urls, or http for localhost
    client = await db.oidc.update({
      where: { id_type: { id: clientId, type: 7 } },
      data: {
        payload: {
          ...client.payload,
          ...(clientURI && { client_uri: clientURI }),
          ...(clientName && { client_name: clientName }),
          ...(tosURI && { tos_uri: tosURI }),
          ...(logoURI && { logo_uri: logoURI }),
          ...(policyURI && { policy_uri: policyURI }),
          ...(network && { network: network }),
          redirect_uris: redirect_uris,
        },
      },
      select: { developers: true, payload: true, id: true },
    })
    res.send(client)
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: e })
  }
})

// Create client
router.post('/', async (req, res) => {
  try {
    const id = uuidv4()
    const client = await db.oidc.create({
      data: {
        id,
        type: 7,
        payload: { client_id: id, network: 'matic', redirect_uris: [] },
      },
    })
    const { userProvider, userId } = req.ctx
    await db.clientsOnDevelopers.create({
      data: {
        user: {
          connect: { provider_id: { provider: userProvider, id: userId } },
        },
        oidc: { connect: { id_type: { id: client.id, type: 7 } } },
        accessLevel: 'OWNER',
      },
    })
    res.send(client)
  } catch (e) {
    logger.error(e)
    res.status(500).send({ error: e })
  }
})

module.exports = router
