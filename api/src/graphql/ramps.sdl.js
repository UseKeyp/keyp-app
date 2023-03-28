export const schema = gql`
  type Ramp {
    id: String!
    address: String!
    accountNickname: String
    isoCurrencyCode: String
    type: RampType!
    createdAt: DateTime!
  }
  type Query {
    ramps: [Ramp]! @requireAuth
  }
  type Mutation {
    getRampUrl(
      type: String!
      direction: RampDirection!
      network: Network!
    ): LoginUrl! @requireAuth
    rampWithdraw(
      type: String
      amount: String!
      network: Network!
    ): Transaction! @requireAuth
  }
  enum RampDirection {
    ON
    OFF
  }
  enum RampType {
    COINBASE
  }
`
