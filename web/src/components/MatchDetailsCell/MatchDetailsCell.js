import DetailsBox from 'src/components/DetailsBox/DetailsBox'
import MovesDetails from 'src/components/MovesDetails/MovesDetails'

export const QUERY = gql`
  query FindMatchDetailsQuery($id: Int!) {
    match: matchDetails(id: $id) {
      id
      moves
      opening
    }
  }
`

export const Loading = () => (
  <div className="details-wrapper">
    <h2 className="text-center text-5xl">Match Details</h2>
    <br />
    <DetailsBox heading="Opening" />
    <br />
    <MovesDetails heading="Moves" movesList="" />
  </div>
)

export const Empty = () => (
  <div className="details-wrapper">
    <h2 className="text-center text-5xl">Match Details</h2>
    <br />
    <DetailsBox heading="Opening" />
    <br />
    <MovesDetails heading="Moves" movesList="" />
  </div>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ match }) => {
  const { moves, opening } = match

  return (
    <div className="details-wrapper">
      <h2 className="text-center text-5xl">Match Details</h2>
      <br />
      <DetailsBox heading="Opening" items={[opening]} />
      <br />
      <MovesDetails heading="Moves" movesList={moves} />
    </div>
  )
}
