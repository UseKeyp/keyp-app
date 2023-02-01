import serverless from 'serverless-http'

import { db } from 'src/lib/db'
import { APP_DOMAIN } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'

import publicApi from './api'

export const handler = serverless(
  publicApi(db, {
    APP_DOMAIN: APP_DOMAIN,
    version: 'v1', // Route prefix eg. /api/v1/<Endpoint>
  })
)
