export const schema = gql`
  type Treasure {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    treasures: [Treasure!]!
    treasure(id: Int!): Treasure
  }

  input CreateTreasureInput {
    
  }

  input UpdateTreasureInput {
    
  }

  type Mutation {
    createTreasure(input: CreateTreasureInput!): Treasure!
    updateTreasure(id: Int!, input: UpdateTreasureInput!): Treasure!
    deleteTreasure(id: Int!): Treasure!
  }
`
