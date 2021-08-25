import DetailsBox from 'src/components/DetailsBox/DetailsBox'

export const QUERY = gql`
  query FindTreasureOpeningQuery($id: Int!) {
    treasureOpening: treasureOpening(id: $id) {
      opening
    }
  }
`

export const Loading = () => <DetailsBox heading="Opening" />

export const Empty = () => <DetailsBox heading="Opening" />

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ treasureOpening }) => {
  return <DetailsBox heading="Opening" items={[treasureOpening.opening]} />
}
