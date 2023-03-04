import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus'

export const fetchUser = async (idOrAddress, creationData, providerType) => {
  try {
    let user
    let id
    let address
    isHexAddress(idOrAddress)
      ? (address = idOrAddress.toLowerCase())
      : (id = idOrAddress)

    const where = {
      ...(address && { address }),
      ...(id && { id: providerType ? `${providerType}-${id}` : id }),
    }
    // logger.debug({ custom: where }, `fetchUser where`)
    user = await db.user.findUnique({ where })
    // logger.debug({ custom: user }, 'fetchUser')
    if (!user) {
      if (creationData) {
        user = await db.user.create({
          data: { id, provider: providerType, ...creationData },
        })
      } else if (address) {
        // Frontend query: Not in our db, but we have address, so create external wallet.
        user = await db.user.create({
          data: {
            id: address,
            username: address,
            address: address,
            provider: 'ETHEREUM',
          },
        })
      } else {
        // TODO: prevent this from happening on the frontend to avoid spamming new wallets
        // API query: Create a new user, who has not signed in yet.
        const newAddress = await getTorusPublicAddress(id)
        user = await db.user.create({
          data: { id, address: newAddress, provider: providerType },
        })
      }
    }
    return {
      ...user,
      accessToken: 'REDACTED',
      refreshToken: 'REDACTED',
    }
  } catch (e) {
    Sentry.captureException(e)
    logger.error(e)
    throw new Error('fetchUser()', e)
  }
}
