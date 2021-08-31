import Games from 'src/components/Game/Games'

export const QUERY = gql`
  query GamesByMemberQuery($id: String!) {
    games: games(id: $id) {
      id
      endTime
      moveCount
      outcome
      termination
      blackId
      whiteId
      treasureId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ games, ...rest }) => {
  // TODO: add sorting/filtering
  return <Games games={games} {...rest} />
}
