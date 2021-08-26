export const schema = gql`
  type Treasure {
    id: String!
    createdAt: DateTime!
    black: Member!
    blackId: String!
    white: Member!
    whiteId: String!
    winner: Member
    winnerId: String
    minter: Member
    minterAddress: String
    owner: Member
    ownerAddress: String
    name: String!
    updatedAt: DateTime!
    cardColor: String!
    blackRating: Int!
    duration: Int!
    whiteRating: Int!
    termination: String!
    endTime: DateTime!
    event: String!
    moves: String!
    moveCount: Int!
    gameRuleVariant: String!
    externalUrl: String
    opening: String!
    achievements: String!
    tokenId: Int
    mintedAt: DateTime!
  }

  type Query {
    treasures: [Treasure!]!
    treasure(id: String!): Treasure
  }

  input CreateTreasureInput {
    blackId: String!
    whiteId: String!
    winnerId: String
    minterAddress: String
    ownerAddress: String
    name: String!
    cardColor: String!
    blackRating: Int!
    duration: Int!
    whiteRating: Int!
    termination: String!
    endTime: DateTime!
    event: String!
    moves: String!
    moveCount: Int!
    gameRuleVariant: String!
    winner: String!
    externalUrl: String
    opening: String!
    achievements: String!
    tokenId: Int
    mintedAt: DateTime!
  }

  input UpdateTreasureInput {
    blackId: String
    whiteId: String
    winnerId: String
    minterAddress: String
    ownerAddress: String
    name: String
    cardColor: String
    blackRating: Int
    duration: Int
    whiteRating: Int
    termination: String
    endTime: DateTime
    event: String
    moves: String
    moveCount: Int
    gameRuleVariant: String
    winner: String
    externalUrl: String
    opening: String
    achievements: String
    tokenId: Int
    mintedAt: DateTime
  }

  type Mutation {
    createTreasure(input: CreateTreasureInput!): Treasure!
    updateTreasure(id: String!, input: UpdateTreasureInput!): Treasure!
    deleteTreasure(id: String!): Treasure!
  }
`
