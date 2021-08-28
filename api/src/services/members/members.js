import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
// import { fetchMember } from 'src/lib/members'
import { isHexAddress } from 'src/lib/helpers'

const fetchMember = async (idOrAddress) => {
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

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const members = () => {
  return db.member.findMany()
}

export const member = ({ id }) => {
  return fetchMember(id)
  // const member = await db.member.findUnique({ where: { id } })
  // return { ...member, }
}

export const createMember = ({ input }) => {
  return db.member.create({
    data: input,
  })
}

export const updateMember = ({ id, input }) => {
  return db.member.update({
    data: input,
    where: { id },
  })
}

export const deleteMember = ({ id }) => {
  return db.member.delete({
    where: { id },
  })
}

export const Member = {
  treasuresOwned: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresOwned(),
  treasuresMinted: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresMinted(),
  treasuresPlayedWhite: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresPlayedWhite(),
  treasuresPlayedBlack: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresPlayedBlack(),
  treasuresWon: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).treasuresWon(),
}
