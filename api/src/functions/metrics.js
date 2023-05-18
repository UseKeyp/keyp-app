import { logger } from 'src/lib/logger'
import { getUserData } from 'src/lib/metrics'
import Sentry from 'src/lib/sentry'

export const handler = async (event, _context) => {
  logger.debug('Invoked /metrics ')
  if (event.httpMethod !== 'GET') {
    return { statusCode: 404 }
  }
  try {
    const userData = await getUserData()
    if (!userData) throw "Couldn't get data"
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: userData,
    }
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    logger.error({ custom: event }, e.message)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    return {
      statusCode: 500,
      body: {
        message: 'Internal server error',
      },
    }
  }
}
