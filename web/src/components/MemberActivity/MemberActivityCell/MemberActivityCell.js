import MemberActivity from 'src/components/MemberActivity/MemberActivity'

export const QUERY = gql`
  query FindMemberActivityQuery($address: String!) {
    activity: member(id: $address) {
      activity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activity }) => {
  return <MemberActivity activity={activity} />
}
