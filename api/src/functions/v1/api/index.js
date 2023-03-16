import bodyParser from 'body-parser'
import express from 'express'

import { validateToken } from './middleware/validation'
import clients from './routes/clients'
import contracts from './routes/contracts'
import health from './routes/health'
import ramps from './routes/ramps'
import tokens from './routes/tokens'
import users from './routes/users'

const cors = require('cors')

const app = (db, settings) => {
  // TODO: set cache policy
  // function cachePolicy(req, res, next) {
  //   res.set('Pragma', 'no-cache')
  //   res.set('Cache-Control', 'no-cache, no-store')
  //   next()
  // }

  // Express docs https://expressjs.com/en/5x/api.html#app.settings.table
  const app = express()

  //////////////////
  // Configuration
  app.use(cors())
  app.set('trust proxy', true)

  //////////////////
  // Pre-Middleware
  app.use(validateToken(settings))
  app.use(bodyParser.json())

  //////////////////
  // Routes
  app.use(`/${settings.version}/tokens`, tokens)
  app.use(`/${settings.version}/clients`, clients)
  app.use(`/${settings.version}/users`, users)
  app.use(`/${settings.version}/contracts`, contracts)
  app.use(`/${settings.version}/ramps`, ramps)

  app.use(`/${settings.version}`, health) // sanity-check

  //////////////////
  // Post-Middleware

  return app
}

export default app
