import { EnvelopError } from '@envelop/core'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { createMauticContact } from 'src/lib/mautic'
import Sentry from 'src/lib/sentry'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { fetchUser } from 'src/lib/users'

const CHESS = 'CHESS'

export const onConnected = async ({ refreshToken, accessToken, decoded }) => {
  try {
    if (!decoded) return null
    /* eslint-disable camelcase */
    logger.debug({ custom: decoded }, 'onConnected() decoded')
    // Create member if needed, and get current avatar
    const {
      preferred_username,
      user_id,
      email,
      email_verified,
      locale,
      picture,
      country,
    } = decoded

    const user = await fetchUser(
      user_id,
      { username: preferred_username },
      CHESS
    )
    if (user.banned) {
      throw new AuthenticationError('user is banned')
    }

    if (!email || !email_verified)
      throw new AuthenticationError(
        `Verify your email with Chess.com and try again.`
      )

    // await createMauticContact({
    //   member: {
    //     username: user.username,
    //     email,
    //     id: user.id,
    //   },
    // })

    await db.user.update({
      where: { id: user.id },
      data: {
        username: preferred_username,
        refreshToken,
        accessToken,
        email,
        // NOTE: Updates user with their current avatar and country
        imageSrc: picture,
        locale,
        country,
        ...(user.blocked && { blocked: false }), // Remove the block if they sign in
      },
    })

    // NOTE: Get Torus wallet address if needed.
    if (!user.address) {
      try {
        const publicAddress = await getTorusPublicAddress(user)
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
