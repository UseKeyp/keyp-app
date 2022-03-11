import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const ramps = async () => {
  const ramps = await db.ramp.findMany({
    where: { ownerId: context.currentUser.id },
  })
  logger.debug(ramps)
}
