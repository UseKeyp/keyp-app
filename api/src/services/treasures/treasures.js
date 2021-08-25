import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const treasures = () => {
  return db.treasure.findMany()
}

export const treasure = ({ id }) => {
  return db.treasure.findUnique({
    where: { id },
  })
}

export const createTreasure = ({ input }) => {
  return db.treasure.create({
    data: input,
  })
}

export const updateTreasure = ({ id, input }) => {
  return db.treasure.update({
    data: input,
    where: { id },
  })
}

export const deleteTreasure = ({ id }) => {
  return db.treasure.delete({
    where: { id },
  })
}

export const Treasure = {
  black: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).black(),
  white: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).white(),
  minter: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).minter(),
  owner: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).owner(),
}
