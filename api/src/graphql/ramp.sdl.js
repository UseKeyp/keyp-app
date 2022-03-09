export const schema = gql`
  type Ramp {
    id: String!
    address: String!
    accountNickname: String!
    isoCurrencyCode: String!
  }

  type Query {
    connectPlaid(code: String!, accountId: String!): Ramp! @requireAuth
  }
`
