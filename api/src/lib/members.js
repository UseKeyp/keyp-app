import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'

export const fetchMember = async (idOrAddress) => {
  let member
  if (isHexAddress(idOrAddress)) {
    member = db.member.findUnique({
      where: {
        address: idOrAddress,
      },
    })
  } else {
    member = db.member.findUnique({
      where: {
        id: idOrAddress,
      },
    })
  }
  // Member is not in our database, so return their EOA wallet
  if (!member) return { address: idOrAddress }
  return member
}
