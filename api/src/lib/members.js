import { db } from 'src/lib/db'
import { isHexAddress } from 'src/lib/helpers'

export const fetchMember = async (idOrAddress) => {
  let member
  if (isHexAddress(idOrAddress)) {
    member = await db.member.findUnique({
      where: {
        address: idOrAddress,
      },
    })
  } else {
    member = await db.member.findUnique({
      where: {
        id: idOrAddress,
      },
    })
  }
  // Member is not in our database
  if (!member)
    return {
      address: idOrAddress,
      id: '',
      dateJoined: new Date(0),
      treasuresOwned: (_obj, { root }) => [],
      treasuresMinted: (_obj, { root }) => [],
      treasuresPlayedWhite: (_obj, { root }) => [],
      treasuresPlayedBlack: (_obj, { root }) => [],
      treasuresWon: (_obj, { root }) => [],
      rating: 0,
      imageSrc: '',
      country: '',
    }
  // TODO: Pull these values from chess.com API
  const rating = 999
  const country = 'USA'
  const imageSrc = ''
  return { ...member, rating, country, imageSrc }
}
