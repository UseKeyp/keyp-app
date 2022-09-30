import Sentry from 'src/lib/sentry'
import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'
import { getTorusPublicAddress } from 'src/lib/torus'

export const fetchUser = async (idOrAddress, creationData) => {
  try {
    let user
    let id
    let address
    isHexAddress(idOrAddress)
      ? (address = idOrAddress.toLowerCase())
      : (id = idOrAddress.toLowerCase())
    user = await db.user.findUnique({
      where: {
        ...(address && { address }),
        ...(id && { id: id.toLowerCase() }),
      },
    })
    if (!user) {
      if (creationData) {
        user = await db.user.create({
          data: { id, ...creationData },
        })
      } else if (address) {
        // Frontend query: Not in our db, but we have address, so create external wallet.
        user = await db.user.create({
          data: {
            id: address,
            username: address,
            address: address,
            country: 'ETHER',
          },
        })
      } else {
        // TODO: prevent this from happening on the frontend to avoid spamming new wallets
        // API query: Create a new user, who has not signed in yet.
        const newAddress = await getTorusPublicAddress(id)
        user = await db.user.create({ data: { id, address: newAddress } })
      }
    }
    return {
      ...user,
      accessToken: 'REDACTED',
      refreshToken: 'REDACTED',
    }
  } catch (e) {
    Sentry.captureException(e)
    throw new Error(`fetchUser() ${e}`)
  }
}
