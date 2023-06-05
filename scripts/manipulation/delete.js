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
  process.exit(0)
})

async function main() {
  const whereQuery = {}
  const treasuresAffected = await db.treasure.count({
    where: whereQuery,
  })
  await rl.question(
    `###### WARNING ###### \nYou are about to delete ${treasuresAffected} treasures. Type "yes" to continue.\n`,
    async (yesOrNo) => {
      if (yesOrNo === 'yes') {
        var startTime = performance.now()
        const updateResults = await db.treasure.deleteMany()
        var endTime = performance.now()
        console.log(`Successfully deleted ${updateResults.count} treasures!`)
        console.log(
          `Duration: ${((endTime - startTime) / 1000).toFixed(3)} seconds`
        )
        rl.close()
      } else {
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
