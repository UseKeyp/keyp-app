// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

export const getIdentifiersFromId = (id) => ({
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
    throw new Error(
      'parseWhere() Both userId and userProvider where not found in the query "where" object'
    )
  return { userProvider, userId }
}

/*
 * Instance of the Prisma Client
 */
const prisma = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
})

// All incoming queries for the User model should have the following format for id "<provider>-<id>"
export const db = prisma.$extends({
  query: {
    user: {
      async $allOperations({ args, query, operation }) {
        if (operation === 'create') {
          const user = await query(args)
          return user ? { ...user, id: `${user.provider}-${user.id}` } : null
        }

        if (!args.where)
          throw new Error('User id and provider must be provided')

        let userId, userProvider

        if (args.where.address) {
          // If address is provided, skip the ID parsing.
          if (args.where.provider || args.where.id)
            // Ensure no overloaded queries are made.
            throw new Error('Address and provider cannot be provided together')
        } else {
          ;({ userId, userProvider } = parseWhere(args.where))
        }

        delete args.where.provider
        delete args.where.id

        const user = await query({
          ...args,
          where: {
            ...(userId &&
              userProvider && {
                provider_id: {
                  id: userId,
                  provider: userProvider,
                },
              }),
            ...args.where,
          },
        })
        return user ? { ...user, id: `${user.provider}-${user.id}` } : null
      },
    },
  },
})
// .$extends({
//   result: {
//     user: {
//       save: {
//         needs: { id: true },
//         compute: async (user) => {
//             const user = await prisma.user.update({
//               where: {
//                 provider_id: { id: user.id, provider: user.provider },
//               },
//               data: user,
//             })
//             return user
//               ? { ...user, id: `${user.provider}-${user.id}` }
//               : null
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
