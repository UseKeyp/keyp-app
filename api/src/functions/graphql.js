import { useSentry } from '@envelop/sentry'

import { createGraphQLHandler } from '@redwoodjs/graphql-server'

/* eslint-disable-next-line no-unused-vars */

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { isProdOrStaging } from 'src/lib/helpers'
import { cors } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import services from 'src/services/**/*.{js,ts}'

// const _identifyFn = async (context) => context.request.ip

let extraPlugins = []
if (isProdOrStaging) {
  // extraPlugins.push(
  //   useSentry({
  //     includeRawResult: false, // set to `true` in order to include the execution result in the metadata collected
  //     includeResolverArgs: false, // set to `true` in order to include the args passed to resolvers
  //     includeExecuteVariables: false, // set to `true` in order to include the operation variables values
  //     // appendTags: (args) => { return { ... }} // if you wish to add custom "tags" to the Sentry transaction created per operation
  //   })
  // )
}

export const handler = createGraphQLHandler({
  getCurrentUser,
  loggerConfig: {
    logger,
    options: {
      requestId: false,
      tracing: false,
      data: false,
      operationName: false,
      query: false,
    },
  },
  directives,
  sdls,
  services,
  cors,
  extraPlugins,
  depthLimitOptions: {
    // https://www.envelop.dev/plugins/use-depth-limit
    maxDepth: 4,
    ignore: [],
  },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
