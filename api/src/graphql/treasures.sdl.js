export const schema = gql`
  type Treasure {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
  }

  type Query {
    treasures: [Treasure!]!
    treasure(id: Int!): Treasure
  }

  input CreateTreasureInput {
    name: String!
  }

  input UpdateTreasureInput {
    name: String
  }

  type Mutation {
    createTreasure(input: CreateTreasureInput!): Treasure!
    updateTreasure(id: Int!, input: UpdateTreasureInput!): Treasure!
    deleteTreasure(id: Int!): Treasure!
  }
`
