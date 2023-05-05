// Run command
// $(node tasks/environment/setupEnv) && yarn rw exec metrics
const path = require('path')

const { Parser } = require('@json2csv/plainjs')
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const fs = require('fs-extra')

dotenv.config()

const directoryPath = path.join(__dirname, './placeImagesHere')

const db = new PrismaClient()

const getMetrics = async () => {
  const select = {
    id: true,
    username: true,
    email: true,
    address: true,
    provider: true,
    locale: true,
    createdAt: true,
    imageSrc: true,
  }
  const users = await db.user.findMany({ select })
  const developers = await db.user.findMany({
    where: {
      address: { not: null },
      clients: {
        some: { oidcType: 7 },
      },
    },
    select: {
      ...select,
      clients: { where: { oidcType: 7 } },
    },
  })
  console.log(`Total users: ${users.length}`)
  console.log(`Total developers: ${developers.length}`)

  try {
    const parser = new Parser()
    const csvUsers = parser.parse(users)
    const csvDevs = parser.parse(developers)

    const date = new Date()
    const timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    fs.writeFile(
      path.join(directoryPath, `../../metrics/keyp-all-users.${timestamp}.csv`),
      csvUsers,
      (err) => {
        if (err) throw err
      }
    )
    fs.writeFile(
      path.join(
        directoryPath,
        `../../metrics/keyp-all-developers.${timestamp}.csv`
      ),
      csvDevs,
      (err) => {
        if (err) throw err
      }
    )
  } catch (err) {
    console.error(err)
  }
}

getMetrics()
