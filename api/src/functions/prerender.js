import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import Sentry from 'src/lib/sentry'

export const handler = async (event, _context) => {
  logger.debug('Invoked /prerender')
  try {
    const { tokenId } = event.queryStringParameters

    const treasure = await db.treasure.findUnique({
      where: { tokenId: Number(tokenId) },
      include: { white: true, black: true },
    })
    if (!treasure) return { statusCode: 404 }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: '',
    }
  } catch (error) {
    /* eslint-disable no-console */
    logger.error(error, { custom: event })
    /* eslint-enable no-console */
    Sentry.captureException(error)
    return {
      statusCode: 500,
      body: { message: `Internal server error. ${error}` },
    }
  }
}
