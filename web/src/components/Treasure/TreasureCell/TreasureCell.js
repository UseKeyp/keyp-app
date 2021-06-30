import Treasure from 'src/components/Treasure/Treasure'

export const QUERY = gql`
  query FindTreasureById($id: Int!) {
    treasure: treasure(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Treasure not found</div>

export const Success = ({ treasure }) => {
  return <Treasure treasure={treasure} />
}
