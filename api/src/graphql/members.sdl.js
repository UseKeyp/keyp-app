export const schema = gql`
  type Member {
    id: Int!
    handle: String!
    dateJoined: DateTime!
    rating: Int!
    treasuresOwned: [Treasure]!
  }

  type Query {
    members: [Member!]!
    member(id: Int!): Member
  }

  input CreateMemberInput {
    handle: String!
    dateJoined: DateTime!
    rating: Int!
  }

  input UpdateMemberInput {
    handle: String
    dateJoined: DateTime
    rating: Int
  }

  type Mutation {
    createMember(input: CreateMemberInput!): Member!
    updateMember(id: Int!, input: UpdateMemberInput!): Member!
    deleteMember(id: Int!): Member!
  }
`
