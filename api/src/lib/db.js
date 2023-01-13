// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

const getIdentifiersFromId = (id) => ({
  userProvider: id.slice(0, id.indexOf('-')),
  userId: id.slice(id.indexOf('-') + 1),
})

const parseWhere = (where) => {
  const { id } = where
  let { userProvider, userId } = getIdentifiersFromId(id)

  if (where.provider) {
    userId = where.id
    userProvider = where.provider
  }
  if (!userId && !userProvider)
    throw new Error('User id and provider must be provided')
  return { userProvider, userId }
}

/*
 * Instance of the Prisma Client
 */
const prisma = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
})

export const db = prisma.$extends({
  query: {
    user: {
      async $allOperations({ args, query, operation }) {
        if (operation === 'create') return query(args)

        if (!args.where)
          throw new Error('User id and provider must be provided')

        let { userId, userProvider } = parseWhere(args.where)

        delete args.where.provider
        delete args.where.id

        return query({
          ...args,
          where: {
            provider_id: {
              id: userId,
              provider: userProvider,
            },
            ...args.where,
          },
        })
      },
    },
  },
})
// .$extends({
//   result: {
//     user: {
//       save: {
//         needs: { id: true },
//         compute(user) {
//           const { userId, userProvider } = getIdentifiersFromId(user.id)
//           return () =>
//             prisma.user.update({
//               where: { provider_id: { id: userId, provider: userProvider } },
//               data: user,
//             })
//         },
//       },
//     },
//   },
// })

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error'],
})
