import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { WYRE } from 'src/lib/oAuth/wyre'

export const ramps = async () => {
  const ramps = await db.ramp.findMany({
    where: { memberId: context.currentUser.id },
  })
  const sortedRamps = ramps.sort((a, b) => a.createdAt > b.createdAt)
  // Get only the most recent for each type
  console.log(sortedRamps)
  logger.info({ custom: sortedRamps })
  const wyreRamp = sortedRamps.find((ramp) => ramp.type == 'WYRE')
  const coinbaseRamp = sortedRamps.find((ramp) => ramp.type == 'COINBASE')
  let filtered = []
  if (wyreRamp) filtered.push(wyreRamp)
  if (coinbaseRamp) filtered.push(coinbaseRamp)
  return filtered
}
