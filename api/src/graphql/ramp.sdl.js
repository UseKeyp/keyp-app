export const schema = gql`
  type Ramp {
    id: String!
    address: String!
    accountNickname: String!
    isoCurrencyCode: String!
    type: RampType!
  }
  type Query {
    ramps: [Ramp!]! @requireAuth
    connectPlaid(code: String!, accountId: String!): Ramp! @requireAuth
  }

  enum RampType {
    WYRE
    COINBASE
  }
`
