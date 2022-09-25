import Sentry from 'src/lib/sentry'
import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'

export const fetchUser = async (idOrAddress, creationData) => {
  try {
    let user
    let id
    let address
    isHexAddress(idOrAddress) ? (address = idOrAddress) : (id = idOrAddress)
    user = await db.user.findUnique({
      where: {
        ...(address && { address }),
        ...(id && { id: id.toLowerCase() }),
      },
    })
    if (!user) {
      user = await db.user.create({
        data: { id, ...creationData },
      })
    } else if (address) {
      // Not in our db, but we have id - Create external wallet user
      user = await db.user.create({
        data: {
          id: address.toLowerCase(),
          username: address.toLowerCase(),
          address: address.toLowerCase(),
          country: 'ETHER',
        },
      })
    }
    return {
      ...user,
      refreshToken: 'REDACTED',
    }
  } catch (e) {
    Sentry.captureException(e)
    throw new Error(`fetchUser() ${e}`)
  }
}
