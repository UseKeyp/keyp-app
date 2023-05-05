import { LOGIN_ENABLED_PROVIDERS } from '@usekeyp/common'

import { db } from 'src/lib/db'

const parseUsers = (users) => {
  let providers = LOGIN_ENABLED_PROVIDERS.reduce(
    (a, v) => ({ ...a, [v]: 0 }),
    {}
  )

  users.map((user) => {
    if (LOGIN_ENABLED_PROVIDERS.includes(user.provider))
      providers[user.provider] += 1
  })

  return { total: users.length, providers }
}

export const getUserData = async () => {
  const clients = await db.oidc.count({ where: { type: 7 } })

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
      clients: { some: { oidcType: 7 } },
    },
    select: {
      ...select,
      clients: { where: { oidcType: 7 } },
    },
  })

  const developerData = parseUsers(developers)
  const userData = parseUsers(users)

  return { users: userData, developers: developerData, clients }
}
