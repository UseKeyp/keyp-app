import {
  members,
  member,
  createMember,
  updateMember,
  deleteMember,
} from './members'

describe('members', () => {
  scenario('returns all members', async (scenario) => {
    const result = await members()

    expect(result.length).toEqual(Object.keys(scenario.member).length)
  })

  scenario('returns a single member', async (scenario) => {
    const result = await member({ id: scenario.member.one.id })

    expect(result).toEqual(scenario.member.one)
  })

  scenario('creates a member', async () => {
    const result = await createMember({
      input: {
        handle: 'String8461893',
        dateJoined: '2021-07-05T23:15:08Z',
        rating: 4899556,
      },
    })

    expect(result.handle).toEqual('String8461893')
    expect(result.dateJoined).toEqual('2021-07-05T23:15:08Z')
    expect(result.rating).toEqual(4899556)
  })

  scenario('updates a member', async (scenario) => {
    const original = await member({ id: scenario.member.one.id })
    const result = await updateMember({
      id: original.id,
      input: { handle: 'String24661712' },
    })

    expect(result.handle).toEqual('String24661712')
  })

  scenario('deletes a member', async (scenario) => {
    const original = await deleteMember({ id: scenario.member.one.id })
    const result = await member({ id: original.id })

    expect(result).toEqual(null)
  })
})
