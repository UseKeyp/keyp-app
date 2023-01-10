import Loader from 'src/components/Loader'
import User from 'src/components/User/User'

export const QUERY = gql`
  query FindUserByUsernameOrAddress($usernameOrAddress: String!) {
    user(usernameOrAddress: $usernameOrAddress) {
      id
      username
      address
      imageSrc
      country
      masterTitle
    }
  }
`

export const Loading = () => <Loader />

export const Error = () => <div>User not found</div>

export const Empty = () => <div>User not found</div>

export const Success = ({ user }) => {
  return <User user={user} />
}
