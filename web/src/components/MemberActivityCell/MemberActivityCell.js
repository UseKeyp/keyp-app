import MemberActivity from 'src/components/MemberActivity'

export const QUERY = gql`
  query FindMemberActivityQuery($address: String!) {
    memberActivity: memberActivity(address: $address) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ memberActivity }) => {
  return <MemberActivity memberActivity={memberActivity} />
}
