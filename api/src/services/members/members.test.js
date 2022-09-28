import {
  users,
  user,
  createMember,
  updateMember,
  deleteMember,
} from './users'

describe('users', () => {
  scenario('returns all users', async (scenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async () => {
    const result = await createMember({
      input: {
        id: 'String',
        address: 'String6973540',
        rating: 8198066,
        imageSrc: 'String',
        country: 'String',
      },
    })

    expect(result.id).toEqual('String')
    expect(result.address).toEqual('String6973540')
    expect(result.rating).toEqual(8198066)
    expect(result.imageSrc).toEqual('String')
    expect(result.country).toEqual('String')
  })

  scenario('updates a user', async (scenario) => {
    const original = await user({ id: scenario.user.one.id })
    const result = await updateMember({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a user', async (scenario) => {
    const original = await deleteMember({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
