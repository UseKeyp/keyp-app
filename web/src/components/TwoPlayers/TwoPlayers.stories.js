import TwoPlayers from './TwoPlayers'

const username = 'Player 1'
const oponent = 'Player 2'
const color = 'white'

export const generated = () => {
  return <TwoPlayers username={username} oponent={oponent} color={color} />
}

export default { title: 'Components/TwoPlayers' }
