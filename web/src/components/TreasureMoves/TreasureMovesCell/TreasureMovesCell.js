import TreasureMoves from 'src/components/TreasureMoves/TreasureMoves'

export const QUERY = gql`
  query TreasureMovesQuery($id: String!) {
    treasure: treasure(id: $id) {
      id
      moves
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <TreasureMoves />

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treasure }) => {
  return <TreasureMoves treasure={treasure} />
}
