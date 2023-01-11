/* eslint-disable no-console */
const { performance } = require('perf_hooks')

const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

const { generateRandomMembers } = require('./helpers')
const exampleMembers = require('./member')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // NOTE: change these as desired
  const newTreasuresToCreate = 100
  // const newMembersToCreate = Math.floor(newTreasuresToCreate / 3)
  const newMembersToCreate = 3

  var startMemberGenTime = performance.now()
  // MEMBERS
  if (newMembersToCreate > 0) {
    console.log(`${newMembersToCreate} new Members `)
    const highestMemberId = await db.member.count()
    const randomMembers = generateRandomMembers(
      newMembersToCreate,
      highestMemberId
    )
    var endMemberGenTime = performance.now()
    console.log(
      `Gen: ${((endMemberGenTime - startMemberGenTime) / 1000).toFixed(
        3
      )} seconds`
    )
    var startMemberWriteTime = performance.now()
    await db.member.createMany({
      data: randomMembers,
    })
    var endMemberWriteTime = performance.now()
    console.log(
      `Write: ${((endMemberWriteTime - startMemberWriteTime) / 1000).toFixed(
        3
      )} seconds`
    )
    console.log('')
  }

  const members = await db.member.findMany()
}

const seed = async () => {
  const rounds = 1
  for (var i = 0; i < rounds; i++) {
    console.log(`############ Round ${i + 1} of ${rounds} ################`)
    await main()
  }
  await db.$disconnect()
}
export default seed
