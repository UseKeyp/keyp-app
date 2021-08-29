import GameCard from 'src/components/Game/GameCard'

export const QUERY = gql`
  query GameQuery($id: String!, $gameId: String!, $date: DateTime!) {
    game: game(id: $id, gameId: $gameId, date: $date) {
      id
      endTime
      moveCount
      outcome
      termination
      blackId
      whiteId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ game }) => {
  return <GameCard game={game} />
}
