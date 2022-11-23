import Sentry from 'src/lib/sentry'
import { logger } from 'src/lib/logger'

export const handler = async (event) => {
  logger.debug('Invoked /image')
  try {
    const { moves, dataOnly, boardLayout } = JSON.parse(event.body)

    let layout = boardLayout
    if (!layout) {
      if (!moves) throw 'No boardLayout or moves provided'
    }
    if (dataOnly) {
      return {
        statusCode: 200,
        body: '',
      }
    }
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': '',
      },
      body: '',
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    logger.error(e)
    Sentry.captureException(e)
    return {
      statusCode: 500, // Always return 200
      body: {
        message: `Internal server error ${e}`,
      },
    }
  }
}
