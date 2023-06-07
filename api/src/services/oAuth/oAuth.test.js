import { COINBASE } from 'src/lib/oAuth/providers/coinbase'
import { PLAID } from 'src/lib/oAuth/providers/plaid'

import { oAuthUrl } from './oAuth'
jest.setTimeout(60000)

/* eslint-disable no-console */
describe('coinbaseLoginUrl', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.user.alice)
    const { url } = await oAuthUrl({ type: COINBASE })
    // console.log(url)
    // console.log(url.split('&'))
    expect(typeof url === 'string').toBe(true)
  })
})

describe('plaidConnection', () => {
  scenario('Get plaid link code', async (scenario) => {
    mockCurrentUser(scenario.user.alice)
    const { text } = await oAuthUrl({ type: PLAID })
    expect(typeof text === 'string').toBe(true)
  })
})
