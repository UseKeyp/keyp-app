import { ramps } from './ramps'
jest.setTimeout(60000)
describe('Ramps', () => {
  scenario('ramps', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const response = await ramps()
    console.log(response)
  })
})
