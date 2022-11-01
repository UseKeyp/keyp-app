import Feather from '@feather-protocol/js-sdk'

const feather = new Feather({
  clientId: process.env.FEATHER_CLIENT_ID,
  clientSecret: process.env.FEATHER_CLIENT_SECRET,
})

export const airdrop = async ({ userId, amount }) => {
  await feather.connect()

  const myToken = await feather.getCollectionByName('MyToken')

  const user = feather.getUser({ identifier: userId })
  await feather.airdrop({ user, token: myToken, amount })

  return user.balances
}
