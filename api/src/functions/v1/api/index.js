import assert from 'assert'
import path from 'path'

import express from 'express'
import fetch from 'node-fetch'

import { getIdentifiersFromId } from 'src/lib/db'

import clients from './clients'
import router from './router'

const encodeBody = (body) =>
  Object.keys(body)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&')

const app = (db, settings) => {
  // TODO: set cache policy
  // function cachePolicy(req, res, next) {
  //   res.set('Pragma', 'no-cache')
  //   res.set('Cache-Control', 'no-cache, no-store')
  //   next()
  // }

  const validateToken = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1]
    if (!token)
      return res.status(401).send('Unauthorized. No access token provided')
    const response = await fetch(
      settings.APP_DOMAIN + '/oauth/token/introspection',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: encodeBody({
          token,
          client_id: 'api-server',
          client_secret: process.env.INTROSPECTION_SECRET,
        }),
      }
    ).then((res) => res.json())
    if (!response.active) return res.status(401).send('Unauthorized')
    const { userId, userProvider } = getIdentifiersFromId(response.sub)
    req.ctx = {
      userId,
      userProvider,
      sub: response.sub,
      scope: response.scope,
      clientId: response.client_id,
    }
    next()
  }

  // Express docs https://expressjs.com/en/5x/api.html#app.settings.table
  const app = express()
  app.set('trust proxy', true)
  app.use(validateToken)
  app.use(`/${settings.version}/clients`, clients) // Prefix routes eg. /v1/sanity-check
  app.use(`/${settings.version}`, router) // Prefix routes eg. /v1/sanity-check

  return app
}

export default app
