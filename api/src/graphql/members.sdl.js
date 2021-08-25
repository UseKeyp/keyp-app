export const schema = gql`
  type Member {
    id: String!
    address: String!
    dateJoined: DateTime!
    rating: Int!
    treasuresOwned: [Treasure]!
    treasuresMinted: [Treasure]!
    treasuresPlayedWhite: [Treasure]!
    treasuresPlayedBlack: [Treasure]!
  }

  type Query {
    members: [Member!]!
    member(id: String!): Member
  }

  input CreateMemberInput {
    address: String!
    dateJoined: DateTime!
    rating: Int!
  }

  input UpdateMemberInput {
    address: String
    dateJoined: DateTime
    rating: Int
  }

  type Mutation {
    createMember(input: CreateMemberInput!): Member!
    updateMember(id: String!, input: UpdateMemberInput!): Member!
    deleteMember(id: String!): Member!
  }
`
