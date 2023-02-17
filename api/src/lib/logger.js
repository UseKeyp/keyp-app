import { createLogger, redactionsList } from '@redwoodjs/api/logger'

import { isProdOrStaging } from 'src/lib/helpers'
/**
 * Creates a logger with RedwoodLoggerOptions
 *
 * These extend and override default LoggerOptions,
 * can define a destination like a file or other supported pino log transport stream,
 * and sets whether or not to show the logger configuration settings (defaults to false)
 *
 * @param RedwoodLoggerOptions
 *
 * RedwoodLoggerOptions have
 * @param {options} LoggerOptions - defines how to log, such as pretty printing, redaction, and format
 * @param {string | DestinationStream} destination - defines where to log, such as a transport stream or file
 * @param {boolean} showConfig - whether to display logger configuration on initialization
 */
export const logger = createLogger({
  options: {
    redact: [...redactionsList, 'refreshToken', 'accessToken'],
    level:
      isProdOrStaging && !process.env.IMPERSONATE_USERNAME ? 'warn' : 'debug', // These are the redwoodJS defaults
    // showConfig: !isProdOrStaging, // Helpful for debugging
  },
})
