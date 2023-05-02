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
    MAINNET
    POLYGON
    MUMBAI
    GNOSIS
    GOERLI
    OPTIMISM
    OPTIMISM_GOERLI
    ARBITRUM
    ARBITRUM_NOVA
    SEPOLIA
    AVALANCHE
    AVALANCHE_FUJI
    MANTLE_TESTNET
  }
`
