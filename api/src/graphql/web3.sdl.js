export const schema = gql`
  type TransferResponse {
    status: TransferStatus!
    hash: String
    error: String
  }
  type Mutation {
    transferErc721(
      tokenAddress: String!
      tokenId: Int!
      toAddress: String!
      network: Network!
    ): TransferResponse! @requireAuth
    transferErc20(
      tokenAddress: String!
      amount: String!
      toAddress: String!
      network: Network!
    ): TransferResponse! @requireAuth
    transferUsdc(
      amount: String!
      toAddress: String!
      network: Network!
    ): TransferResponse! @requireAuth
  }

  enum TransferStatus {
    SUCCESS
    FAILED
  }

  enum Network {
    mainnet
    polygon
    mumbai
    gnosis
    goerli
    optimism
    "optimism-goerli"
    arbitrum
    "arbitrum-nova"
    sepolia
    avalanche
    "avalanche-fuji"
  }
`
