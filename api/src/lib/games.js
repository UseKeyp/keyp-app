const countMoves = (moves) => {
  return Math.round(moves.trim().split(' ').length / 2)
}

const parseDate = (rawDate) => {
  try {
    if (!rawDate) return ''
    if (typeof rawDate === 'object')
      rawDate = new Date(rawDate).toISOString().split('T')[0].replace('-', '.')
    let [year, month, day] = rawDate.split(/[\.-]/)
    if (year.includes('?')) year = 0
    month = month.includes('?') ? 0 : month - 1
    if (day.includes('?')) day = 1
    return new Date(year, month, day)
  } catch (e) {
    console.log('Error in parseDate() with argument: ')
    console.log({ rawDate })
  }
}

export const parsePgn = (pgn) => {
  let black
  let white
  let winner = 'white'
  let eventName
  let moves
  let termination
  let blackRating
  let whiteRating
  let timeControl
  pgn.split(/\n/).map((line) => {
    if (line.includes('[Black ')) black = line.split(`"`)[1]
    if (line.includes('[White ')) white = line.split(`"`)[1]
    if (line.includes('[Event ')) eventName = line.split(`"`)[1]
    let winnerRaw
    if (line.includes('[Result ')) winnerRaw = line.split(`"`)[1]
    if (winnerRaw === '0-1') winner = 'black'
    else if (winnerRaw === '1/2-1/2') winner = 'draw'
    if (line.match(/1./)) moves = line.split(/[0-21/2]+-/)[0].trim()
    if (line.includes('[Termination ')) termination = line.split(`"`)[1]
    if (line.includes('[BlackElo ')) blackRating = Number(line.split(`"`)[1])
    if (line.includes('[WhiteElo ')) whiteRating = Number(line.split(`"`)[1])
    if (line.includes('[TimeControl ')) timeControl = Number(line.split(`"`)[1])
  })

  return {
    black,
    white,
    winner,
    event: eventName,
    moves,
    moveCount: countMoves(moves),
    termination,
    blackRating,
    whiteRating,
    timeControl,
  }
}

const getGameOutcome = ({ white, black }) => {
  if (white.result === 'win') return 'white'
  if (black.result === 'win') return 'black'
  return 'draw'
}
export const parseGame = (game) => {
  const {
    termination,
    date,
    blackRating,
    whiteRating,
    timeControl,
    moveCount,
  } = parsePgn(game.pgn)
  const splitUrl = game.url.split('/')
  const id = splitUrl[splitUrl.length - 1]
  return {
    id,
    outcome: getGameOutcome({ white: game.white, black: game.black }),
    termination,
    blackRating,
    whiteRating,
    timeControl,
    blackId: game.black.username,
    whiteId: game.white.username,
    endTime: new Date(game.end_time * 1000),
    moveCount,
  }
}

export const fetchGames = async (id) => {
  const res = await fetch(
    `https://api.chess.com/pub/player/${id}/games/2021/02`
  )
  const games = (await res.json()).games
  if (!games) return []
  return games.map((game) => parseGame(game))
}

export const fetchGame = async ({ id, memberId, endTime }) => {
  const year = new Date(endTime).getFullYear()
  const month = new Date(endTime).getMonth() + 1
  const res = await fetch(
    `https://api.chess.com/pub/player/${id}/games/${year}/${month}`
  )
  const json = await res.json()
  if (!json.games) return null
  console.log(json.games)
  const game = json.games.find((g) => g.url.includes(gameId))
  if (!game) return null
  return parseGame(game)
}
