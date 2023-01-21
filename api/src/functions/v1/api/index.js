import bodyParser from 'body-parser'
import express from 'express'

import { validateToken } from './middleware/validation'
import clients from './routes/clients'
import health from './routes/health'
import tokens from './routes/tokens'
import users from './routes/users'

const app = (db, settings) => {
  // TODO: set cache policy
  // function cachePolicy(req, res, next) {
  //   res.set('Pragma', 'no-cache')
  //   res.set('Cache-Control', 'no-cache, no-store')
  //   next()
  // }

  // Express docs https://expressjs.com/en/5x/api.html#app.settings.table
  const app = express()

  // Configuration
  app.set('trust proxy', true)

  // Middleware
  app.use(validateToken(settings))
  app.use(bodyParser.json())

  // Routes
  app.use(`/${settings.version}/tokens`, tokens) // Prefix routes eg. /v1/sanity-check
  app.use(`/${settings.version}/clients`, clients) // Prefix routes eg. /v1/sanity-check
  app.use(`/${settings.version}/users`, users) // Prefix routes eg. /v1/sanity-check
  app.use(`/${settings.version}`, health) // sanity-check

  return app
}

export default app
