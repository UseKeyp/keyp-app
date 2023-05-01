import fetch from 'node-fetch'

import { clients } from 'src/functions/oauth/oauth'
import { getIdentifiersFromId, db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const encodeFormBody = (body) =>
  Object.keys(body)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&')

export const validateToken = (settings) => async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1]
    if (!token)
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'No access token provided',
      })
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
    if (!response.active)
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'No access token provided',
      })
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
        next(
          new Error(
            "No client found. Are you sure you're using a generated client and not the dev-portal client?"
          )
        )
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
