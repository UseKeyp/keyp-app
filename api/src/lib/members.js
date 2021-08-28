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
      treasuresOwned: (_obj, { root }) =>
        db.member.findUnique({ where: { id: root.id } }).treasuresOwned(),
      treasuresMinted: (_obj, { root }) =>
        db.member.findUnique({ where: { id: root.id } }).treasuresMinted(),
      treasuresPlayedWhite: [null],
      treasuresPlayedBlack: (_obj, { root }) =>
        db.member.findUnique({ where: { id: root.id } }).treasuresPlayedBlack(),
      treasuresWon: (_obj, { root }) =>
        db.member.findUnique({ where: { id: root.id } }).treasuresWon(),
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
