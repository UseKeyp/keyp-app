import { EnvelopError } from '@envelop/core'
import ProfanityFilter from 'bad-words'

const profanityFilter = new ProfanityFilter()

profanityFilter.removeWords('Pawn', 'pawn')

export const isHexAddress = (address) => {
  return /^0x[0-9a-fA-F]{40}$/i.test(address)
}

export const isDevelopment =
  ['local', 'dev', 'sandbox'].includes(process.env.ENVIRONMENT) ||
  process.env.NODE_ENV == null

export const isProduction = !isDevelopment

let appDomain = process.env.APP_DOMAIN
if (process.env.VERCEL) {
  appDomain = `https://${process.env.VERCEL_URL}`
}
export const APP_DOMAIN = appDomain

export const isExpired = (expiration) => {
  return new Date(expiration) > new Date()
}

export const isOlderThanResubmitTimeout = (date) => {
  // var TEN_MIN = 10 * 60 * 1000
  // var TEN_MIN = 0.2 * 60 * 1000
  var TWO_HOURS = 60 * 60 * 1000 * 2
  const now = new Date()
  return now - new Date(date) > TWO_HOURS
}

export const checkProfanity = (string) => {
  if (profanityFilter.isProfane(string))
    throw new EnvelopError('String contains profanity')
}

export const validateTreasureTitle = (string) => {
  if (!string) throw new EnvelopError('Title must not be empty')
  checkProfanity(string)
  if (
    !string.match(
      /[\uD800-\uDBFF \uDC00-\uDFFF a-z A-Z 0-9 !@#$*%^&()+=-[\]';,.\\\/{}|":<>\?]/
    )
  )
    throw new Error(
      `Only alphanumeric characters, emojis, and the symbols !@#$%^&*()+=-[]\\/|';,.{}":<>? are allowed.`
    )
}

let appDomain = process.env.APP_DOMAIN
if (process.env.REDWOOD_ENV_VERCEL_URL) {
  appDomain = `https://${process.env.REDWOOD_ENV_VERCEL_URL}`
}
export const APP_DOMAIN = appDomain

export const cors = {
  origin: isProduction
    ? APP_DOMAIN
    : [
        'http://0.0.0.0:8910',
        'http://localhost:8910',
        'http://localhost',
        'http://10.0.2.2:8910',
      ],
  credentials: true,
}
