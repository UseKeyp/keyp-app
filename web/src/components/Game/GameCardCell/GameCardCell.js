import GameCard from 'src/components/Game/GameCard'

export const QUERY = gql`
  query GameQuery($id: String!, $memberId: String!, $endTime: DateTime!) {
    game: game(id: $id, memberId: $memberId, endTime: $endTime) {
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
