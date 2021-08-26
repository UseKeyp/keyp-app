export const schema = gql`
  type Game {
    id: String!
    createdAt: DateTime!
    black: Member!
    blackId: String!
    white: Member!
    whiteId: String!
    name: String!
    updatedAt: DateTime!
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
  }

  type Query {
    games(id: String!): [Games!]!
  }
`
