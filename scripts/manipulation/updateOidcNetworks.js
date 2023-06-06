const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

// Update network values in payload of Oidc model to uppercase
;(async () => {
  try {
    const oidcRecords = await db.oidc.findMany()

    const updatedRecords = oidcRecords.map(async (record) => {
      const payload = record.payload
      if (payload.network) {
        payload.network = payload.network.toUpperCase()
        await db.oidc.update({
          where: {
            id_type: {
              id: record.id,
              type: record.type,
            },
          },
          data: {
            payload: payload,
          },
        })
      }
    })

    await Promise.all(updatedRecords)
    console.log('Updated network values in Oidc model')
  } catch (error) {
    console.error('Error updating Oidc records:', error)
  } finally {
    await db.$disconnect()
  }
})()
