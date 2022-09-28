import User from 'src/components/User/User'
import Loader from 'src/components/Loader'

export const QUERY = gql`
  query FindUserByUsernameOrAddress($usernameOrAddress: String!) {
    user(usernameOrAddress: $usernameOrAddress) {
      id
      username
      address
      imageSrc
      country
      masterTitle
      twitchUsername
      treasuresPlayedWhite {
        id
        endTime
        moveCount
        outcome
        winner {
          id
        }
      }
      treasuresPlayedBlack {
        id
        endTime
        outcome
        moveCount
        winner {
          id
        }
      }
    }
  }
`

export const Loading = () => <Loader />

export const Error = () => <div>User not found</div>

export const Empty = () => <div>User not found</div>

export const Success = ({ user }) => {
  return <User user={user} />
}
