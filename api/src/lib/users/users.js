import { v4 as uuidv4 } from 'uuid'

import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { GOOGLE } from 'src/lib/oAuth/providers/google'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus'

export const safeFetchUserByUsername = async ({ username, providerType }) => {
  try {
    let user = await db.user.findUnique({
      where: {
        username_provider: {
          username: username.toLowerCase(),
          provider: providerType,
        },
      },
    })
    if (!user && username.match(/^\S+@\S+\.\S+$/)) {
      // Allow fetching wallet address for GMAIL users who haven not signed up yet
      user = await fetchUser(
        `TEMPORARY_${uuidv4()}`,
        { email: username.toLowerCase(), username: username.toLowerCase() },
        GOOGLE
      )
      const newAddress = await getTorusPublicAddress(user)
      user = await db.user.update({
        where: { id: user.id },
        data: { address: newAddress },
      })
    }
    return {
      id: user.id,
      provider: user.provider,
      username: user.username,
      address: user.address,
      imageSrc: user.imageSrc,
    }
  } catch (e) {
    Sentry.captureException(e)
    logger.error(e)
    throw new Error('safeFetchUserByUsername()', e)
  }
}

export const safeFetchUser = async (
  idOrAddress,
  creationData,
  providerType
) => {
  try {
    const user = await fetchUser(idOrAddress, creationData, providerType)
    return {
      id: user.id,
      provider: user.provider,
      username: user.username,
      address: user.address,
      imageSrc: user.imageSrc,
    }
  } catch (e) {
    Sentry.captureException(e)
    logger.error(e)
    throw new Error('safeFetchUser()', e)
  }
}

// Creates a new user if none exists
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
    user = await db.user.findUnique({ where })
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
        const newAddress = await getTorusPublicAddress({ id })
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
