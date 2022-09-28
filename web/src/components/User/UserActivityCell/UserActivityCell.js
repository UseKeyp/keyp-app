import UserActivity from 'src/components/User/UserActivity'

export const QUERY = gql`
  query FindUserActivityQuery($usernameOrAddress: String!) {
    user(usernameOrAddress: $usernameOrAddress) {
      id
      username
      imageSrc
      treasuresMinted {
        id
        createdAt
        title
        tokenId
        achievementScore
        marketSales {
          id
          status
          amount
          updatedAt
          buyer {
            id
            imageSrc
            username
          }
        }
      }
      marketSalesPurchased {
        id
        status
        amount
        updatedAt
        treasure {
          id
          title
          tokenId
          achievementScore
        }
      }
      marketSalesSold {
        id
        status
        amount
        updatedAt
        treasure {
          id
          title
          tokenId
          achievementScore
        }
      }
    }
  }
`

export const Loading = () => <UserActivity isLoading />

export const Empty = () => <UserActivity user={[]} />

export const Failure = () => <UserActivity user={[]} />
export const Success = ({ user, refetch }) => {
  return <UserActivity user={user} refetch={refetch} />
}
