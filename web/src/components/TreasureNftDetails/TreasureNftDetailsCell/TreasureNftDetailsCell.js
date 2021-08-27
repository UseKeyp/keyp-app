import DetailsBox from 'src/components/DetailsBox/DetailsBox'
import TreasureNftDetails from 'src/components/TreasureNftDetails/TreasureNftDetails'

export const QUERY = gql`
  query TreasureNftDetailsQuery($id: String!) {
    treasureNftDetails: treasureNftDetails(id: $id) {
      owner {
        id
        address
      }
      minter {
        id
        address
      }
      bids
      history
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div></div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treasureNftDetails }) => (
  <TreasureNftDetails treasureNftDetails={treasureNftDetails} />
)
