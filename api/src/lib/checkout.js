import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { processStripeWebhook } from 'src/lib/stripe'

export const processOrder = async ({ body, stripeSignature }) => {
  try {
    if (stripeSignature) {
      // Stripe order
      await processStripeWebhook({ body, stripeSignature })
    } else {
      logger.debug({ custom: body })
      // const { order } = body
      // if (order) return processWertWebhook({ body })
    }
  } catch (e) {
    await sendDiscordAdminAlert({
      embed: {
        color: 16740982,
        title: `⛈️ Failed to process ${
          stripeSignature ? 'Stripe' : ''
        } webhook!`,
        description: `${JSON.stringify(e)}`,
        footer: { text: new Date().toString() },
        type: 'link',
      },
      channelName: 'orders',
    })
    logger.error(`processOrder() ${e}`)
    Sentry.captureException(e)
  }
}
