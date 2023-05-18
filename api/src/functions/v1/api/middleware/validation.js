import fetch from 'node-fetch'

import { clients } from 'src/functions/oauth/oauth'
import { getIdentifiersFromId, db } from 'src/lib/db'
import { addErrorLocation } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'

const encodeFormBody = (body) =>
  Object.keys(body)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&')

export const validateToken = (settings) => async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1]
    if (!token) {
      const error = new Error('No access token provided')
      error.statusCode = 401
      error.name = 'Unauthorized'
      error.errorLocation = 'validateToken'
      return next(error)
    }
    const response = await fetch(
      settings.APP_DOMAIN + '/oauth/token/introspection',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: encodeFormBody({
          token,
          client_id: 'api-server',
          client_secret: process.env.INTROSPECTION_SECRET,
        }),
      }
    ).then((res) => res.json())
    if (!response.active) {
      const error = new Error('No access token provided')
      error.statusCode = 401
      error.name = 'Unauthorized'
      error.errorLocation = 'validateToken'
      return next(error)
    }

    const { userId, userProvider } = getIdentifiersFromId(response.sub)

    let client
    // Inject client details
    client = clients.find((c) => c.id === response.clientId)
    if (!client) {
      try {
        client = await db.oidc.findUnique({
          where: { id_type: { id: response.client_id, type: 7 } },
        })
      } catch (e) {
        next(addErrorLocation('validateToken', e))
      }
    }

    req.ctx = {
      network: client?.payload?.network,
      client,
      userId,
      userProvider,
      sub: response.sub,
      scope: response.scope,
      clientId: response.client_id,
    }
    next()
  } catch (e) {
    logger.error(e)
    res.status(500).json({
      statusCode: 500,
      error: 'Server Error',
      message: 'Something went wrong',
    })
  }
}
