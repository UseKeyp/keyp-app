/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

/*
 * Seed data is database data that needs to exist for your app to run.
 *
 * @see https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-reset
 * @see https://www.prisma.io/docs/guides/prisma-guides/seed-database
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
 */
async function main() {
  console.warn('Please define your seed data.')

  // // Change to match your data model and seeding needs
   const memberData = [
  //   { name: 'alice', email: 'alice@example.com' },
  {
  id: erik, // Chess.com username
  address: "0x33f6ba34A34d24885DFE166891A4A8FB83643105", // Wallet address
  // --------------- STATE --------------
  dateJoined: 2010-05-11T21:17:15+0000,
  rating: 1500
  },
  {
    id: "jschiarizzi",
    address: "0xe4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cab",
    dateJoined: 2016-02-12T21:17:15+0000,
    rating: 2201
  },
  {
    id: "pi0neerpat",
    address: "0x3F266494C5364a98D14E3b391F84d753A0fa5f14",
    dateJoined: 2021-02-12T21:17:15+0000,
    rating: 1200
  }

]

const treasureData = [
  {
    id:"0x51a46b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc221", // Moves hash plus end time
    //createdAt DateTime @default(now())
    // --------------- LINKS --------------
    // Chess.com (required)
    //black Member relation(name: "treasuresPlayed", fields: [blackId], references: [id])
    blackId: "pi0neerpat",
    white Member relation(name: "treasuresPlayed", fields: [whiteId], references: [id])
    whiteId: "jschiarizzi",
    // NFT (optional)
    //minter Member? @relation(name: "treasuresMinted", fields: [minterAddress], references: [address])
    minterAddress: 0xe4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cab,
    //owner Member? @relation(name: "treasuresOwned", fields: [ownerAddress], references: [address])
    ownerAddress: 0x33f6ba34A34d24885DFE166891A4A8FB83643105,
    // --------------- STATE --------------
    name: "best game ever",
    updatedAt: "2021-08-25T21:17:18+0000",
    // Chess
    cardColor: "white", // white or black
    blackRating: 1500,
    duration: 500, // game length in seconds
    whiteRating: 1400,
    termination: "Checkmate", // eg. "Checkmate"
    endTime: "2021-08-25T21:17:15+0000",
    event: "Live Chess", // eg. "Live Chess"
    moves: "1. Nf3 d6 2. Nc3 g6 3. e4 Bg7 4. Bc4 Nf6 5. d4 O-O 6. O-O a6 7. a4 c5 8. dxc5 dxc5 9. Be3 b6 10. Qd2 Qc7 11. Bh6 Rd8 12. Qc1 Bb7 13. e5 Ng4 14. Bxg7 Kxg7 15. Qf4 f5 16. h3 Nh6 17. Ng5 Bc8 18. Be6 Rd4 19. Qh2 Bb7 20. Bxf5 Kh8 21. Be4 Bxe4 22. Ne6 Qb7 23. Qf4 Bf5 24. Nxd4 cxd4 25. Qxh6 Nc6 26. Ne2 Bxc2 27. Qd2 d3 28. Nc1 Rd8 29. f4 a5 30. f5 Nxe5 31. fxg6 Nxg6 32. Rf7 Qd5 33. Rf3 Ne5 34. Rf5 Qe4 35. Qf2 Rg8 36. Rf8 Nc4 37. Rxg8+ Kxg8 38. Qg3+ Kf7 39. b3 Qe3+ 40. Qxe3 Nxe3 41. Nxd3 Bxd3 42. Rc1 Bf5 43. Rc3 Nd5 44. Rf3 Ke6 45. g4 Bg6 46. h4 Be4 47. Rg3 Ke5 48. h5 Kf4 49. Kh2 Ne3 50. Kh3 Bc2 51. g5 Bxb3 52. g6 hxg6 53. Rxg6 Bf7 54. Rxb6 Bxh5 55. Rb5 Bg4+ 56. Kh2 Nc4 57. Kg2 Be2 58. Kf2 Bd3 59. Rd5 Ke4 60. Rb5 Kd4 61. Ke1 Bc2 62. Rg5 e5 63. Ke2 Bxa4 64. Rxe5 Nxe5 65. Kd2 Bb5 66. Kc2 Nf3 67. Kb3 Kc5 68. Ka3 Kc4 69. Kb2 Kb4 70. Ka2 Bc4+ 71. Kb2 Ne5 72. Ka1 Kb3 73. Kb1 Kc3 74. Ka1 Nd3 75. Kb1 Nb4 76. Kc1 Ba2 77. Kd1 Kd3 78. Kc1 Kc3 79. Kd1 Bc4 80. Ke1 Kd3 81. Kf2 Ke4 82. Kg3 Be6 83. Kh2 Kf3 84. Kh1 Nd3 85. Kg1 Bh3 86. Kh2 Nf4 87. Kg1 Kg3 88. Kh1 Bg2+ 89. Kg1 Ne2# 0-1", // pgn moves
    moveCount: 89, // eg. "43"
    gameRuleVariant: "Standard", // eg. "Standard" or "Chess960"
    winner: "Black", // "white" or "black"
    externalUrl: "https://www.chess.com/game/daily/28103371", // Link to game on chess.com
    opening: "Scandinavian", // eg. "Queen's Gambit"
    achievements: "win/play above 2200,queen side castle,mate with a bishop", // List eg. "win/play above 2200,queen side castle,mate with a bishop"
    // NFT
    tokenId: "25",
    mintedAt: "2021-08-25T21:17:16+0000"
  },
  {
    id:"0x99996b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc221", // Moves hash plus end time
    //createdAt DateTime @default(now())
    // --------------- LINKS --------------
    // Chess.com (required)
    //black Member relation(name: "treasuresPlayed", fields: [blackId], references: [id])
    blackId: "pi0neerpat",
    //white Member relation(name: "treasuresPlayed", fields: [whiteId], references: [id])
    whiteId: "jschiarizzi",
    // NFT (optional)
    //minter Member? @relation(name: "treasuresMinted", fields: [minterAddress], references: [address])
    minterAddress: 0xe4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cab,
    //owner Member? @relation(name: "treasuresOwned", fields: [ownerAddress], references: [address])
    ownerAddress: 0x33f6ba34A34d24885DFE166891A4A8FB83643105,
    // --------------- STATE --------------
    name: "best game ever",
    updatedAt: "2021-07-25T21:17:18+0000",
    // Chess
    cardColor: "white", // white or black
    blackRating: 2200,
    duration: 500, // game length in seconds
    whiteRating: 1100,
    termination: "Checkmate", // eg. "Checkmate"
    endTime: "2021-07-25T21:17:15+0000",
    event: "Live Chess", // eg. "Live Chess"
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7 5. Be3 O-O 6. Bd3 c6 7. h3 b5 8. b4 a5 9. a3 Bb7 10. O-O Nbd7 11. Ne2 c5 12. dxc5 Nxe4 13. Bxe4 Bxe4 14. Rb1 dxc5 15. Ng5 Bc6 16. c3 axb4 17. cxb4 c4 18. Nd4 Qc7 19. Nxc6 Qxc6 20. Qe2 Ne5 21. Bc5 Nd3 22. h4 Nxc5 23. bxc5 Qxc5 24. Qf3 Rxa3 25. Qb7 Rb3 26. Rxb3 cxb3 27. Qe4 e6 28. Nf3 Qc4 29. Qb1 Qc2 30. Qxc2 bxc2 31. Rc1 Rc8 32. Ne1 b4 33. Rxc2 Rxc2 34. Nxc2 b3 35. Na3 Kf8 36. Nb1 Ke7 37. Kf1 Kd6 38. Nd2 b2 39. Nb1 Kc5 40. Ke2 Kc4 41. Kd2 Kb3 42. Kd3 Ka2 43. Kc2 f5 44. g3 h6 45. f3 g5 46. hxg5 hxg5 47. Nd2 e5 48. Nb1 e4 49. fxe4 fxe4 0-1", // pgn moves
    moveCount: 49, // eg. "43"
    gameRuleVariant: "Standard", // eg. "Standard" or "Chess960"
    winner: "Black", // "white" or "black"
    externalUrl: "https://www.chess.com/game/daily/29358099", // Link to game on chess.com
    opening: "King's Gambit", // eg. "Queen's Gambit"
    achievements: "win/play above 2200,queen side castle,mate with a bishop", // List eg. "win/play above 2200,queen side castle,mate with a bishop"
    // NFT
    tokenId: "11",
    mintedAt: "2021-07-25T21:17:16+0000"
  },
  {
    id:"0x77776b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc221", // Moves hash plus end time
    //createdAt DateTime @default(now())
    // --------------- LINKS --------------
    // Chess.com (required)
    //black Member relation(name: "treasuresPlayed", fields: [blackId], references: [id])
    blackId: "pi0neerpat",
    //white Member relation(name: "treasuresPlayed", fields: [whiteId], references: [id])
    whiteId: "jschiarizzi",
    // NFT (optional)
    //minter Member? @relation(name: "treasuresMinted", fields: [minterAddress], references: [address])
    minterAddress: 0xe4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cab,
    //owner Member? @relation(name: "treasuresOwned", fields: [ownerAddress], references: [address])
    ownerAddress: 0x33f6ba34A34d24885DFE166891A4A8FB83643105,
    // --------------- STATE --------------
    name: "best game ever",
    updatedAt: "2021-01-25T21:17:13+0000",
    // Chess
    cardColor: "white", // white or black
    blackRating: 2200,
    duration: 500, // game length in seconds
    whiteRating: 1100,
    termination: "Checkmate", // eg. "Checkmate"
    endTime: "2021-01-25T21:17:14+0000",
    event: "Live Chess", // eg. "Live Chess"
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7 5. Be3 O-O 6. Bd3 c6 7. h3 b5 8. b4 a5 9. a3 Bb7 10. O-O Nbd7 11. Ne2 c5 12. dxc5 Nxe4 13. Bxe4 Bxe4 14. Rb1 dxc5 15. Ng5 Bc6 16. c3 axb4 17. cxb4 c4 18. Nd4 Qc7 19. Nxc6 Qxc6 20. Qe2 Ne5 21. Bc5 Nd3 22. h4 Nxc5 23. bxc5 Qxc5 24. Qf3 Rxa3 25. Qb7 Rb3 26. Rxb3 cxb3 27. Qe4 e6 28. Nf3 Qc4 29. Qb1 Qc2 30. Qxc2 bxc2 31. Rc1 Rc8 32. Ne1 b4 33. Rxc2 Rxc2 34. Nxc2 b3 35. Na3 Kf8 36. Nb1 Ke7 37. Kf1 Kd6 38. Nd2 b2 39. Nb1 Kc5 40. Ke2 Kc4 41. Kd2 Kb3 42. Kd3 Ka2 43. Kc2 f5 44. g3 h6 45. f3 g5 46. hxg5 hxg5 47. Nd2 e5 48. Nb1 e4 49. fxe4 fxe4 0-1", // pgn moves
    moveCount: 49, // eg. "43"
    gameRuleVariant: "Standard", // eg. "Standard" or "Chess960"
    winner: "Black", // "white" or "black"
    externalUrl: "https://www.chess.com/game/daily/28103371", // Link to game on chess.com
    opening: "French Defence", // eg. "Queen's Gambit"
    achievements: "win/play above 2200,queen side castle,mate with a bishop", // List eg. "win/play above 2200,queen side castle,mate with a bishop"
    // NFT
    tokenId: "11",
    mintedAt: "2021-01-25T21:17:16+0000"
  }
  //   { name: 'jackie', email: 'jackie@example.com' },
  //   { name: 'bob', email: 'bob@example.com' },
   ]

  // // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
  // // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
  // return Promise.all(
  //   data.map(async (user) => {
  //     const record = await db.user.create({
  //       data: { name: user.name, email: user.email },
  //     })
  //     console.log(record)
  //   })
  // )


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
