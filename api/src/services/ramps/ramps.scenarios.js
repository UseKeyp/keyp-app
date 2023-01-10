import { generateRandomMembers } from '../../../../scripts/seed/helpers'

const generatedMembers = generateRandomMembers(1, 0)

const user = {}
const names = ['alice', 'bob', 'carol', 'dan', 'eve']
generatedMembers.map((item, index) => {
  user[names[index]] = { data: item }
})

export const standard = defineScenario({
  user,
})
