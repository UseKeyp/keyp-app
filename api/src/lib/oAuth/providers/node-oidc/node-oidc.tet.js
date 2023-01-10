import { handleCoinbaseLogin } from './node-oidc'
import { jest } from '@jest/globals'

jest.setTimeout(20000)

describe('coinbaseLoginUrl', () => {
  /*eslint-disable */
  scenario('Happy case', async () => {
    /*eslint-enable */
    await handleCoinbaseLogin({
      accessToken: process.env.TEST_COINBASE_AUTH_TOKEN,
    })
  })
})
