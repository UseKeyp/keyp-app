import Member from 'src/components/Member/Member'

export const QUERY = gql`
  query FindMemberById($id: String!) {
    member: member(id: $id) {
      id
      address
      dateJoined
      rating
      imageSrc
      country
      masterTitle
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Member not found</div>

export const Success = ({ member }) => {
  return <Member member={member} />
}
