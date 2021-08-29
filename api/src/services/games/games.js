import { requireAuth } from 'src/lib/auth'
import { parseGames, fetchGame, fetchGames } from 'src/lib/games'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

// Games by member id
export const games = async ({
  id, // user ID
}) => {
  return fetchGames(id)
}

// Game by game id and date
export const game = async ({
  id, // game ID
  date,
}) => {
  return await fetchGame(id, date)
}

const exampleGame = {
  id: '0x51a46b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc221', // Moves hash plus end time
  black: {
    type: '__Member',
    id: 'jschiarizzi',
  },
  white: {
    type: '__Member',
    id: 'erik',
  },
  winner: {
    type: '__Member',
    id: 'erik',
  },
  name: 'Erik crushes',
  cardColor: 'white', // white or black
  blackRating: 1500,
  whiteRating: 1400,
  blackMasterTitle: 'GM',
  timeControl: 500, // game length in seconds
  termination: 'Checkmate', // eg. "Checkmate"
  endTime: new Date('2021-08-24T21:17:15+0000'),
  event: 'Live Chess', // eg. "Live Chess"
  moves:
    '1. e4 e6 2. d4 d5 3. Nd2 c5 4. Ngf3 Nf6 5. e5 Nfd7 6. c3 Nc6 7. Bd3 Qb6 8. O-O cxd4 9. cxd4 Nxd4 10. Nxd4 Qxd4 11. Nf3 Qb6 12. Qa4 a6 13. Qg4 g6 14. Bg5 Bg7 15. Rfe1 Nc5 16. Qd4 Nd7 17. Qf4 Nc5 18. Qd4 Nd7 19. Qc3 Qc5 20. Qd2 b5 21. Rac1 Qa7 22. Qb4 Bf8 23. Qa5 Qb6 24. Qxb6 Nxb6 25. Rc7 Nd7 26. Rec1 Bc5 27. b4 Bxf2+ 28. Kxf2 O-O 29. Be7 Re8 30. Bd6 Nb6 31. Ng5 Nc4 32. Nxf7 a5 33. Nh6+ Kh8 34. Be7 Rxe7 35. Rxe7 axb4 36. Ng4 Kg8 37. Bb1 d4 38. Kg3 Ra3+ 39. Kh4 Ra8 40. Rf1 1-0', // pgn moves
  moveCount: 89, // eg. "43"
  gameRuleVariant: 'Standard', // eg. "Standard" or "Chess960"
  outcome: 'white', // "white" or "black"
  externalUrl: 'https://www.chess.com/game/daily/28103371', // Link to game on chess.com
  opening: 'Scandinavian', // eg. "Queen's Gambit"
  achievements: 'win/play above 2200,queen side castle,mate with a bishop', // List eg. "win/play above 2200,queen side castle,mate with a bishop"
}

export const Treasure = {}
