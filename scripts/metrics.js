const fs = require('fs-extra')
const dotenv = require('dotenv')
var { parse } = require('csv-parse')
const { PrismaClient } = require('@prisma/client')

dotenv.config()

const db = new PrismaClient()
// Run command
// $(node tasks/environment/setupEnv) && yarn rw exec metrics

const countLogins = async () => {
    const signedInMemberCount = await db.member.count({
      where: { address: { not: null} },
    })
    console.log(`Total wallets: ${signedInMemberCount}`)
}

countLogins()
