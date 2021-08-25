import ProfilePage from './ProfilePage'
import TwoPlayers from './TwoPlayers'
import MiniButton from 'src/components/MiniButton'
import avatar from 'src/components/Avatar/chess-avatar.png'

const itemsMultiply = (item, amount) =>
  Array(amount)
    .fill(undefined)
    .map((_, i) => ({ id: i + 1, ...item }))

const players = (
  <TwoPlayers username="Player_1" oponent="Player_2" color="white" />
)

const match = {
  achievements: ["Intro: Queen's Gambit", 'Won While Down'],
  title: 'User-Made Title',
  numMoves: '42',
  winner: 'WHITE',
  blackPlayer: 'user 2',
  blackPlayerRating: '234',
  matchId: 9873678,
  rarityFlagColor: '#5DCC36',
  edition: 'white',
  whitePlayer: 'GM Hikaru',
  whitePlayerRating: '1234',
  wonByText: 'Checkmate',
  variantText: 'Standard',
  openingText: "Bird's Opening",
  gifUrl: 'https://media0.giphy.com/media/3o6ZsYLRb6IG6vAkcU/giphy.gif',
}
const tableMatch = {
  players,
  result: 'White won',
  moves: 46,
  date: 'April, 20 2020',
  mint: (
    <MiniButton variant="gold" onClick={(e) => handleClick(e)}>
      Mint
    </MiniButton>
  ),
}
const activity = {
  activity: 'Your bid on item 123456789 was accepted!',
  date: 'April, 20 2020',
  action: (
    <MiniButton variant="green" onClick={(e) => handleClick(e)}>
      View
    </MiniButton>
  ),
}

const tableMatches = itemsMultiply(tableMatch, 10)
const matches = itemsMultiply(match, 10).map((match) => ({
  ...match,
  title: `Match with id "${match.id}"`,
}))
const activities = itemsMultiply(activity, 5)

const userData = {
  avatar,
  date: '21st May 2021',
  name: 'Username',
  score: 1337,
  address: '0x706342C7F358cF05370db27ae0d9b1791ADefd08',
}

const handleClick = (e) => {
  e.stopPropagation()
  console.log('Doing something')
}

export const generated = () => {
  return (
    <ProfilePage
      userData={userData}
      matchesTableData={tableMatches}
      matchesData={matches}
      activitiesData={activities}
    />
  )
}

export default { title: 'Pages/ProfilePage' }
