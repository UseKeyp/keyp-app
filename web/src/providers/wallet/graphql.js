export const USER_BALANCE_QUERY = gql`
  query FindUserBalanceQuery($network: Network!) {
    userBalance(network: $network) {
      usdcBalance
    }
  }
`
export const TRANSFER_ERC721_MUTATION = gql`
  mutation transferErc721(
    $tokenAddress: String!
    $tokenId: Int!
    $toAddress: String!
  ) {
    transferErc721(
      tokenAddress: $tokenAddress
      tokenId: $tokenId
      toAddress: $toAddress
    ) {
      status
      hash
    }
  }
`
export const TRANSFER_ERC20_MUTATION = gql`
  mutation transferErc20(
    $tokenAddress: String!
    $amount: String!
    $toAddress: String!
    $network: Network!
  ) {
    transferErc20(
      tokenAddress: $tokenAddress
      amount: $amount
      toAddress: $toAddress
      network: $network
    ) {
      status
      hash
    }
  }
`

export const TRANSFER_USDC_MUTATION = gql`
  mutation transferUsdc($amount: String!, $toAddress: String!) {
    transferUsdc(amount: $amount, toAddress: $toAddress) {
      status
      hash
    }
  }
`
