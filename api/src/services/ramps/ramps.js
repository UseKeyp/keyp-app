import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const ramps = async () => {
  const ramps = await db.ramp.findMany({
    where: { memberId: context.currentUser.id },
  })
  logger.debug(ramps)
}
