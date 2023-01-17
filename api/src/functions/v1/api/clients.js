import { v4 as uuidv4 } from 'uuid'

import { db, getIdentifiersFromId } from 'src/lib/db'

var express = require('express')
var router = express.Router()

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
  const { userId, userProvider } = getIdentifiersFromId(req.ctx.sub)
  const clients = await db.oidc.findMany({
    where: { developers: { some: { userProvider, userId } } },
    include: { developers: true },
  })
  console.log('clients', clients[0].developers)
  res.send(
    clients
      .filter((client) => !client.disabled)
      .map((client) => ({
        ...client,
        accessLevel: getAccessLevel(client.developers, userId),
      }))
  )
})

// export const updateClient = async ({ id, redirectUrls }) => {
//   const client = await db.oidc.findUnique({
//     where: { id_type: { id, type: 7 } },
//     select: { developers: true, payload: true },
//   })
//   if (!client) throw new Error('Client not found')

//   validateEditAccess(client.developers)
//   const list = redirectUrls.split(',').map((url) => url.trim())
//   // TODO validate list as https urls, or http for localhost
//   return db.oidc.update({
//     where: { id_type: { id, type: 7 } },
//     data: { payload: { ...client.payload, redirect_uris: list } },
//   })
// }

// Create client
router.post('/', async (req, res) => {
  const id = uuidv4()
  const client = await db.oidc.create({
    data: {
      id,
      type: 7,
      payload: { client_id: id, redirect_uris: [] },
    },
  })
  const { userId, userProvider } = getIdentifiersFromId(req.ctx.sub)
  await db.clientsOnDevelopers.create({
    data: {
      user: {
        connect: { provider_id: { provider: userProvider, id: userId } },
      },
      oidc: { connect: { id_type: { id: client.id, type: 7 } } },
      accessLevel: 'OWNER',
    },
  })
  res.send({ client })
})

module.exports = router
