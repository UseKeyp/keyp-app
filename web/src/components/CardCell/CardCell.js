import GameCardCell from 'src/components/Game/GameCardCell'
import TreasureCardCell from 'src/components/TreasureCardCell'

export const QUERY = gql`
  query FindTreasureQuery($id: String!) {
    treasure: treasure(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = (props) => {
  // console.log(props)
  console.log(props)
  // If treasure doesn't exist, load the game card
  return <GameCardCell id={props.id} />
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treasure }) => {
  return <TreasureCardCell id={treasure.id} />
}
