import { db } from 'src/lib/db'

export const getKeypIdToken = async (userId) => {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error(`getKeypIdToken() User not found: ${userId}`)
  let idToken = 'abc123'
  // Get idToken from oauth server

  return idToken
}
