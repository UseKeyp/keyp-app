import {
  treasures,
  treasure,
  createTreasure,
  updateTreasure,
  deleteTreasure,
} from './treasures'

describe('treasures', () => {
  scenario('returns all treasures', async (scenario) => {
    const result = await treasures()

    expect(result.length).toEqual(Object.keys(scenario.treasure).length)
  })

  scenario('returns a single treasure', async (scenario) => {
    const result = await treasure({ id: scenario.treasure.one.id })

    expect(result).toEqual(scenario.treasure.one)
  })

  scenario('creates a treasure', async () => {
    const result = await createTreasure({
      input: { updatedAt: '2021-06-30T07:43:04Z' },
    })

    expect(result.updatedAt).toEqual('2021-06-30T07:43:04Z')
  })

  scenario('updates a treasure', async (scenario) => {
    const original = await treasure({ id: scenario.treasure.one.id })
    const result = await updateTreasure({
      id: original.id,
      input: { updatedAt: '2021-07-01T07:43:04Z' },
    })

    expect(result.updatedAt).toEqual('2021-07-01T07:43:04Z')
  })

  scenario('deletes a treasure', async (scenario) => {
    const original = await deleteTreasure({ id: scenario.treasure.one.id })
    const result = await treasure({ id: original.id })

    expect(result).toEqual(null)
  })
})
