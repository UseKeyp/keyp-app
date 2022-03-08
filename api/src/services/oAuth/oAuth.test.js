import { oAuthUrl, connectPlaid } from './oAuth'
import { COINBASE } from 'src/lib/oAuth'
jest.setTimeout(20000)

// describe('coinbaseLoginUrl', () => {
//   scenario('Happy case', async (scenario) => {
//     mockCurrentUser(scenario.member.alice)
//     const { url } = await oAuthUrl({ type: COINBASE })
//     /* eslint-disable no-console */
//     console.log(url)
//     console.log(url.split('&'))
//     expect(typeof url === 'string').toBe(true)
//   })
// })

describe('plaidConnection', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    await connectPlaid({
      code: 'public-sandbox-a8d66bb6-e2fb-443c-bf5f-fa9018c38b62',
      accountId: 'ln9va9vRk3SQAkNxvov9I1lnKa3MEMsEjJqxM',
    })
  })
})
