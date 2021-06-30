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
      input: { handle: 'String2238884' },
    })

    expect(result.handle).toEqual('String2238884')
  })

  scenario('updates a member', async (scenario) => {
    const original = await member({ id: scenario.member.one.id })
    const result = await updateMember({
      id: original.id,
      input: { handle: 'String93165092' },
    })

    expect(result.handle).toEqual('String93165092')
  })

  scenario('deletes a member', async (scenario) => {
    const original = await deleteMember({ id: scenario.member.one.id })
    const result = await member({ id: original.id })

    expect(result).toEqual(null)
  })
})
