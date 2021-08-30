import { db } from 'src/lib/db'
const { id: sha3 } = require('@ethersproject/hash')

export const getTreasureId = ({
  moves, // String of moves from the PGN
  endTime, // String of UNIX timecode from chess.com API
  cardColor, // String of version of treasure: "white" or "black"
}) => {
  let endTimeString = endTime
  console.log(endTime)
  if (typeof endTime === Date)
    endTimeString = (Date.parse(endTime) / 1000).toString()
  console.log(endTimeString)
  return sha3(moves + endTime + cardColor)
  // sha3("1. d4 d5 2. c4 e6 3. Nc3 c6 4. e3 Nf6"+"1612749143"+"white")
}
