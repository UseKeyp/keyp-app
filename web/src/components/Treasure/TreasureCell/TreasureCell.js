import Treasure from 'src/components/Treasure/Treasure'

export const QUERY = gql`
  query FindTreasureById($id: String!) {
    treasure: treasure(id: $id) {
      id
      createdAt
      blackId
      whiteId
      minterAddress
      ownerAddress
      name
      updatedAt
      cardColor
      blackRating
      timeControl
      whiteRating
      termination
      endTime
      event
      moves
      moveCount
      gameRuleVariant
      winner
      externalUrl
      opening
      achievements
      tokenId
      mintedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Treasure not found</div>

export const Success = ({ treasure }) => {
  return <Treasure treasure={treasure} />
}
