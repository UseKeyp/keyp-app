import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { fetchUser } from 'src/lib/users'
import { getUsdcBalance as getUsdcBal } from 'src/lib/web3/usdc.js'

export const user = ({ usernameOrAddress }) => {
  try {
    return fetchUser(usernameOrAddress)
  } catch (e) {
    logger.error(e)
    return null
  }
}

export const profile = () => fetchUser(context.currentUser.username)

export const usernames = async ({ query, orderBy }) => {
  const users = await db.user.findMany({
    take: 6,
    where: {
      username: {
        contains: query,
      },
    },
    orderBy,
  })
  return users.map((user) => user.username)
}

export const userLocale = async ({ locale }) => {
  try {
    const user = await db.user.update({
      where: { id: context.currentUser.id },
      data: { locale: locale },
    })
    return user
  } catch (e) {
    throw `userLocale() ${e}`
  }
}

export const userBalance = async ({ network }) => {
  const usdcBalance = await getUsdcBal({
    network,
    address: context.currentUser.address,
  })
  if (!(usdcBalance >= 0)) {
    throw new Error('userBalance() Unable to fetch USDC balance')
  }
  if (!context.currentUser.mintCredits) {
    throw new Error('userBalance() mintCredits not set')
  }
  return {
    usdcBalance,
  }
}

export const Member = {
  treasuresOwned: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).treasuresOwned(),
  treasuresMinted: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).treasuresMinted(),
  treasuresPlayedWhite: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).treasuresPlayedWhite(),
  treasuresPlayedBlack: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).treasuresPlayedBlack(),
  treasuresWon: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).treasuresWon(),
  marketSalesSold: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).marketSalesSold(),
  marketSalesPurchased: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).marketSalesPurchased(),
}
