import TreasureOpening from 'src/components/Treasure/TreasureOpening'

export const QUERY = gql`
  query FindTreasureOpeningQuery($id: String!) {
    treasure(id: $id) {
      id
      opening
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <TreasureOpening />

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treasure }) => {
  return <TreasureOpening treasure={treasure} />
}
