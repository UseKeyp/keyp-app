import * as Sentry from '@sentry/node'
/* eslint-disable-next-line no-unused-vars */
import * as Tracing from '@sentry/tracing'

import { isProdOrStaging } from 'src/lib/helpers'

// if (isProdOrStaging) {
// const DSN =
//   'https://143f90a661ce4c8f9eef7260e59352ef@o1016103.ingest.sentry.io/6251590'
// Sentry.init({
//   dsn: DSN,
//   tracesSampleRate: 0.5,
//   environment: process.env.ENVIRONMENT,
// })
// }
export default Sentry
