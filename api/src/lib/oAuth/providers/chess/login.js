import { EnvelopError } from '@envelop/core'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { createMauticContact } from 'src/lib/mautic'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

export const onConnected = async ({ refreshToken, accessToken, decoded }) => {
  try {
    if (!decoded) return null
    /* eslint-disable camelcase */
    const { preferred_username, user_id, email } = decoded
    logger.debug({ custom: decoded }, 'onConnected() decoded')
    // Create member if needed, and get current avatar
    const user = await fetchUser(preferred_username, true, 'CHESS')
    if (user.banned) {
      throw new AuthenticationError('user is banned')
    }
    if (user_id !== user.id)
      throw new AuthenticationError(
        `user_id in JWT doesn't match player_id from API`
      )

    if (!email)
      throw new EnvelopError(
        `Couldn't fetch email for user ${preferred_username} in fetchUser function`
      )

    await createMauticContact({
      member: {
        username: user.username,
        email,
        id: user.id,
      },
    })

    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
        accessToken,
        email,
        // NOTE: Updates user with their current avatar and country
        imageSrc: user.imageSrc,
        country: user.country,
        ...(user.masterTitle && { masterTitle: user.masterTitle }),
        ...(user.blocked && { blocked: false }), // Remove the block if they sign in
      },
    })

    // NOTE: Get Torus wallet address if needed.
    if (!user.address) {
      try {
        const publicAddress = await getTorusPublicAddress(user.id)
        logger.debug(`getTorusPublicAddress - ${publicAddress}`)
        await db.user.update({
          where: { id: user.id },
          data: { address: publicAddress },
        })
      } catch (e) {
        logger.error(e, "Error fetching user's wallet from Torus")
      }
    }
    return user
  } catch (e) {
    logger.error(e)
    Sentry.captureException(e)
    throw `onConnected() error`
  }
}
