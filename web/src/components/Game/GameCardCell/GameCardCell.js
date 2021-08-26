import GameCard from 'src/components/Game/GameCard/GameCard'

export const QUERY = gql`
  query GameQuery($id: String!) {
    game: game(id: $id) {
      id
      endTime
      moveCount
      outcome
      winner {
        id
      }
      black {
        id
      }
      white {
        id
      }
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
