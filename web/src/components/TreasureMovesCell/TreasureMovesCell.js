import MovesDetails from 'src/components/MovesDetails/MovesDetails'

export const QUERY = gql`
  query TreasureMovesQuery($id: Int!) {
    treasureMoves: treasureMoves(id: $id) {
      moves
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treasureMoves }) => {
  return (
    <ul>
      {treasureMoves.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
