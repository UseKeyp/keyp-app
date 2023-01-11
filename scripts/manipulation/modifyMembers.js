/* eslint-disable no-console */
const { performance } = require('perf_hooks')
const readline = require('readline')

const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('close', function () {
  console.log('\nExiting!')
  process.exit(0)
})

async function main() {
  const whereQuery = {}
  const membersAffected = await db.user.count({
    where: whereQuery,
  })
  await rl.question(
    `###### WARNING ###### \nYou are about to update ${membersAffected} members. Type "yes" to continue.\n`,
    async (yesOrNo) => {
      if (yesOrNo === 'yes') {
        var startTime = performance.now()
        const updateResults = await db.user.updateMany({
          where: whereQuery,
          data: { imageSrc: '' },
        })
        var endTime = performance.now()
        console.log(`Successfully modified ${updateResults.count} members!`)
        console.log(
          `Duration: ${((endTime - startTime) / 1000).toFixed(3)} seconds`
        )
        rl.close()
      } else {
        console.log('No changes made.')
        rl.close()
      }
    }
  )
}

const modify = async () => {
  await main()
  await db.$disconnect()
}
export default modify
