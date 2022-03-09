import { oAuthUrl, connectPlaid } from './oAuth'
import { COINBASE } from 'src/lib/oAuth'
import { getSandboxPublicToken } from 'src/lib/oAuth/wyre'
jest.setTimeout(60000)

/* eslint-disable no-console */
describe('coinbaseLoginUrl', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const { url } = await oAuthUrl({ type: COINBASE })
    console.log(url)
    console.log(url.split('&'))
    expect(typeof url === 'string').toBe(true)
  })
})

describe('plaidConnection', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const { code, accountId } = await getSandboxPublicToken()
    // console.log(code)
    // console.log(accountId)
    await connectPlaid({
      // code: 'public-sandbox-6b0baaac-50a0-4cc4-8c70-3f5c8cf577e2',
      // accountId: 'ywQkJpg4mmF5BopmR6evCKErg3Jd6pfWedyjW',
      code,
      accountId,
    })
  })
})
