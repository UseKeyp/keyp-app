export const schema = gql`
  type Member {
    id: Int!
    handle: String!
  }

  type Query {
    members: [Member!]!
    member(id: Int!): Member
  }

  input CreateMemberInput {
    handle: String!
  }

  input UpdateMemberInput {
    handle: String
  }

  type Mutation {
    createMember(input: CreateMemberInput!): Member!
    updateMember(id: Int!, input: UpdateMemberInput!): Member!
    deleteMember(id: Int!): Member!
  }
`
